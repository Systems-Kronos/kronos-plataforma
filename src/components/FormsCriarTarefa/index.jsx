import { useState, useEffect } from "react";
import styles from "./FormsCriarTarefa.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { habilidadesPorEmpresa } from "../../service/habilidades";
import { usuariosPorGestor } from "../../service/usuarios";
import MuiSingleSelect from "../Selects/singleSelect";
import MuiMultiSelect from "../Selects/multipleSelect";

const OPCOES_GUT = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

export default function FormsCriarTarefa({ onClose }) {
  const [step, setStep] = useState(1);
  const [opcoesHabilidades, setOpcoesHabilidades] = useState([]);
  const [loadingHabilidades, setLoadingHabilidades] = useState(true);
  const [opcoesUsuarios, setOpcoesUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    habilidades: [],
    prioridade: "",
    data: "",
    atribuir: "",
    gravidade: "",
    urgencia: "",
    tendencia: "",
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
      } catch (err) {
        console.error("Erro ao carregar habilidades:", err);
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
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
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

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Criar Tarefa", formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <div className={styles.formsModal}>
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

                <label htmlFor="atribuir">Atribuir à</label>
                <MuiSingleSelect
                  id="atribuir"
                  name="atribuir"
                  value={formData.atribuir}
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
                      id="gestao"
                      name="gestao"
                      value={formData.gestao}
                      onChange={handleChangeSelect}
                      options={OPCOES_GUT}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="urgencia">Urgência</label>
                    <MuiSingleSelect
                      id="gestao"
                      name="gestao"
                      value={formData.gestao}
                      onChange={handleChangeSelect}
                      options={OPCOES_GUT}
                    />
                  </div>

                  <div>
                    <label htmlFor="tendencia">Tendência</label>
                    <MuiSingleSelect
                      id="gestao"
                      name="gestao"
                      value={formData.gestao}
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
          {step === 1 && (
            <Button texto="Cancelar" variant="secundario" onClick={onClose} />
          )}
          {step === 2 && (
            <Button texto="Voltar" variant="secundario" onClick={handleBack} />
          )}
          <Button
            texto={step === 1 ? "Próximo" : "Criar"}
            variant="primario"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
