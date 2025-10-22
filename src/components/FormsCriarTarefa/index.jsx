import { useState, useEffect } from "react";
import styles from "./FormsCriarTarefa.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { habilidadesPorEmpresa } from "../../service/habilidades";
import { usuariosPorGestor } from "../../service/usuarios";
import { criarTarefa } from "../../service/tarefas";
import MuiSingleSelect from "../Selects/singleSelect";
import MuiMultiSelect from "../Selects/multipleSelect";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const OPCOES_GUT = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export default function FormsCriarTarefa({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });
  const [opcoesHabilidades, setOpcoesHabilidades] = useState([]);
  const [loadingHabilidades, setLoadingHabilidades] = useState(true);
  const [opcoesUsuarios, setOpcoesUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    gravidade: null,
    urgencia: null,
    tendencia: null,
    tempoEstimado: null,
    habilidades: [],
    idUsuario: null,
  });

  const handleChangeSelect = (event) => {
    const {
      target: { value, name },
    } = event;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const carregarHabilidades = async () => {
      try {
        const habilidades = await habilidadesPorEmpresa();
        const mappedHabilidades = (habilidades || []).map((h) => ({
          value: h.id,
          label: h.nome,
        }));
        setOpcoesHabilidades(mappedHabilidades || []);
      } catch (error) {
        console.error("Erro ao carregar habilidades:", error);
      } finally {
        setLoadingHabilidades(false);
      }
    };

    const carregarUsuarios = async () => {
      try {
        const response = await usuariosPorGestor();
        const usuarios = response?.membros || [];
        const mappedUsuarios = usuarios.map((u) => ({
          value: u.id,
          label: u.nome,
        }));
        setOpcoesUsuarios(
          mappedUsuarios.sort((a, b) => a.label.localeCompare(b.label)) || []
        );
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      } finally {
        setLoadingUsuarios(false);
      }
    };

    carregarHabilidades();
    carregarUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({ mensagem: "", tipo: "" });
    setLoading(true);

    if (
      !formData.titulo ||
      !formData.descricao ||
      !formData.gravidade ||
      !formData.urgencia ||
      !formData.tendencia ||
      formData.habilidades.length === 0 ||
      !formData.idUsuario
    ) {
      setAlerta({
        id: Date.now(),
        mensagem: "Por favor, preencha todos os campos.",
        tipo: "aviso",
      });
      setLoading(false);
      return;
    }

    const habilidadesMap = formData.habilidades.map((idHabilidade, index) => ({
      idHabilidade: idHabilidade,
      prioridade: index + 1,
    }));

    try {
      await criarTarefa(
        formData.titulo,
        formData.descricao,
        formData.gravidade,
        formData.urgencia,
        formData.tendencia,
        formData.prazoTarefa,
        formData.tempoEstimado,
        habilidadesMap,
        [formData.idUsuario]
      );

      setAlerta({
        id: Date.now(),
        mensagem: "Tarefa criada com sucesso!",
        tipo: "sucesso"
      });
      setTimeout(() => {onClose()}, 1500);
    } catch {
      setAlerta({
        id: Date.now(),
        mensagem: "Erro ao criar tarefa. Tente novamente.",
        tipo: "erro"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formsModal}>
      {loading && <Loading />}

      {alerta.mensagem && (
        <Alert key={alerta.id} mensagem={alerta.mensagem} tipo={alerta.tipo} />
      )}

      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Criar nova tarefa</h2>
            <p>
              {step === 1
                ? "Preencha as informações iniciais"
                : "Complete os detalhes da tarefa"}
            </p>
          </div>
          <CancelIcon
            style={{ color: "#370963", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className={styles.modalBody}>
          <form>
            {step === 1 && (
              <>
                <label htmlFor="titulo">Título da Tarefa</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  className={styles.inputText}
                  placeholder="Digite o título da tarefa"
                  value={formData.titulo}
                  onChange={handleChange}
                />

                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  className={styles.inputText}
                  placeholder="Descreva os detalhes da tarefa"
                  value={formData.descricao}
                  onChange={handleChange}
                />

                <label htmlFor="habilidades">Habilidades</label>
                <MuiMultiSelect
                  id="habilidades"
                  name="habilidades"
                  value={formData.habilidades}
                  onChange={handleChangeSelect}
                  options={opcoesHabilidades}
                  loading={loadingHabilidades}
                />

                <label htmlFor="idUsuario">Atribuir à</label>
                <MuiSingleSelect
                  id="idUsuario"
                  name="idUsuario"
                  value={formData.idUsuario}
                  onChange={handleChangeSelect}
                  options={opcoesUsuarios}
                  loading={loadingUsuarios}
                />
              </>
            )}

            {step === 2 && (
              <>
                <label htmlFor="prazoTarefa">Prazo da tarefa</label>
                <input
                  type="date"
                  id="prazoTarefa"
                  name="prazoTarefa"
                  className={styles.inputText}
                  value={formData.prazoTarefa}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />

                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="tempoEstimado">Tempo estimado (h)</label>
                    <input
                      type="number"
                      id="tempoEstimado"
                      name="tempoEstimado"
                      className={styles.inputNumber}
                      value={formData.tempoEstimado}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="gravidade">Gravidade</label>
                    <MuiSingleSelect
                      id="gravidade"
                      name="gravidade"
                      value={formData.gravidade}
                      onChange={handleChangeSelect}
                      options={OPCOES_GUT}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="urgencia">Urgência</label>
                    <MuiSingleSelect
                      id="urgencia"
                      name="urgencia"
                      value={formData.urgencia}
                      onChange={handleChangeSelect}
                      options={OPCOES_GUT}
                    />
                  </div>

                  <div>
                    <label htmlFor="tendencia">Tendência</label>
                    <MuiSingleSelect
                      id="tendencia"
                      name="tendencia"
                      value={formData.tendencia}
                      onChange={handleChangeSelect}
                      options={OPCOES_GUT}
                    />
                  </div>
                </div>
              </>
            )}
          </form>
        </div>

        <div className={styles.modalFooter}>
          {step === 1 ? (
            <>
              <Button texto="Cancelar" variant="secundario" onClick={onClose} />
              <Button texto="Próximo" variant="primario" onClick={handleNext} />
            </>
          ) : (
            <>
              <Button
                texto="Voltar"
                variant="secundario"
                onClick={handleBack}
              />
              <Button
                texto="Criar Tarefa"
                variant="primario"
                onClick={handleSubmit}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
