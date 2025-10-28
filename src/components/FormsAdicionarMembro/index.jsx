import { useState, useEffect } from "react";
import styles from "./FormsAdicionarMembro.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { listarCargos } from "../../service/cargos";
import { setoresPorEmpresa } from "../../service/setores";
import { adicionarUsuario } from "../../service/usuarios";
import {
  habilidadesPorEmpresa,
  adicionarHabilidadeUsuarios,
} from "../../service/habilidades";
import MuiMultiSelect from "../Selects/multipleSelect";
import MuiSingleSelect from "../Selects/singleSelect";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const OPCOES_GESTAO = [
  { value: "false", label: "Não" },
  { value: "true", label: "Sim" },
];

export default function FormsAdicionarMembro({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });
  const [opcoesSetores, setOpcoesSetores] = useState([]);
  const [loadingSetores, setLoadingSetores] = useState(true);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [loadingCargos, setLoadingCargos] = useState(true);
  const [opcoesHabilidades, setOpcoesHabilidades] = useState([]);
  const [loadingHabilidades, setLoadingHabilidades] = useState(true);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    setor: "",
    cargo: "",
    gestao: "false",
    habilidades: [],
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
    const carregarSetores = async () => {
      try {
        const setores = await setoresPorEmpresa();
        const mappedSetores = (setores || []).map((h) => ({
          value: h.id,
          label: h.nome,
        }));
        setOpcoesSetores(mappedSetores || []);
      } catch (error) {
        console.error("Erro ao carregar setores:", error);
      } finally {
        setLoadingSetores(false);
      }
    };

    const carregarCargos = async () => {
      try {
        const cargos = await listarCargos();
        const mappedCargos = (cargos || []).map((h) => ({
          value: h.id,
          label: h.nome,
        }));
        setOpcoesCargos(mappedCargos || []);
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
      } finally {
        setLoadingCargos(false);
      }
    };

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

    carregarSetores();
    carregarCargos();
    carregarHabilidades();
  }, []);

  const maskCpf = (value) => {
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return value;
  };

  const maskTelefone = (value) => {
    value = value.replace(/\D/g, "");

    if (value.startsWith("55")) {
      value = value.slice(2);
    }

    value = value.slice(0, 11);
    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = maskCpf(value);
    } else if (name === "telefone") {
      formattedValue = maskTelefone(value);
    } else if (name === "habilidades") {
      const options = Array.from(e.target.selectedOptions);
      formattedValue = options.map((option) => option.value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({ mensagem: "", tipo: "" });
    setLoading(true);

    if (
      !formData.nomeCompleto ||
      !formData.email ||
      !formData.cpf ||
      !formData.setor ||
      !formData.cargo ||
      formData.habilidades.length === 0
    ) {
      setAlerta({
        id: Date.now(),
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
        tipo: "aviso",
      });
      setLoading(false);
      return;
    }

    const payload = {
      nome: formData.nomeCompleto,
      email: formData.email,
      telefone: formData.telefone,
      cpf: formData.cpf,
      booleanGestor: formData.gestao === "true",
      setorId: Number(formData.setor),
      cargoId: Number(formData.cargo),
    };

    try {
      const novoUsuario = await adicionarUsuario(payload);

      if (formData.habilidades.length > 0 && novoUsuario.id) {
        await adicionarHabilidadeUsuarios(
          novoUsuario.id,
          formData.habilidades.map((id) => Number(id))
        );
      }

      setAlerta({
        id: Date.now(),
        mensagem: "Usuário adicionado com sucesso!",
        tipo: "sucesso",
      });
      setTimeout(() => {onClose()}, 1500);
    } catch {
      setAlerta({
        id: Date.now(),
        mensagem: "Erro ao adicionar usuário. Tente novamente.",
        tipo: "erro",
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
            <h2>Adicionar novo membro</h2>
            <p>Preencha todas as informações para criar o cadastro!</p>
          </div>
          <CancelIcon
            style={{ color: "#370963", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <label htmlFor="nomeCompleto">Nome Completo</label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  className={styles.inputText}
                  placeholder="Digite o nome completo"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                />

                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  className={styles.inputText}
                  placeholder="Digite apenas números"
                  value={formData.cpf}
                  onChange={handleChange}
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={styles.inputText}
                  placeholder="Digite o e-mail empresarial"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label htmlFor="telefone">Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  className={styles.inputText}
                  placeholder="Digite o telefone pessoal"
                  value={"+55 " + formData.telefone}
                  onChange={handleChange}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="setor">Setor</label>
                    <MuiSingleSelect
                      id="setor"
                      name="setor"
                      value={formData.setor}
                      onChange={handleChangeSelect}
                      options={opcoesSetores}
                      loading={loadingSetores}
                    />
                  </div>

                  <div>
                    <label htmlFor="gestao">Permitir gestão</label>
                    <MuiSingleSelect
                      id="gestao"
                      name="gestao"
                      value={formData.gestao}
                      onChange={handleChangeSelect}
                      options={OPCOES_GESTAO}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cargo">Cargo</label>
                  <MuiSingleSelect
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChangeSelect}
                    options={opcoesCargos}
                    loading={loadingCargos}
                  />
                </div>

                <div>
                  <label htmlFor="habilidades">Habilidades</label>
                  <MuiMultiSelect
                    id="habilidades"
                    name="habilidades"
                    value={formData.habilidades}
                    onChange={handleChangeSelect}
                    options={opcoesHabilidades}
                    loading={loadingHabilidades}
                  />
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
                texto="Adicionar"
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
