import { useState, useEffect } from "react";
import styles from "./FormsAdicionarMembro.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { listarCargos } from "../../service/cargos";
import { setoresPorEmpresa } from "../../service/setores";
import { adicionarUsuario, deletarUsuario } from "../../service/usuarios";
import { habilidadesPorEmpresa, adicionarHabilidadeUsuarios } from "../../service/habilidades";
import MuiMultiSelect from "../Selects/multipleSelect";
import MuiSingleSelect from "../Selects/singleSelect";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { validarEmail, validarTelefone, validarCPF } from "../../utils/validacaoRegex";

const OPCOES_GESTAO = [
  { value: "false", label: "Não" },
  { value: "true", label: "Sim" },
];

export default function FormsAdicionarMembro({ onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });
  const [opcoesSetores, setOpcoesSetores] = useState([]);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [opcoesHabilidades, setOpcoesHabilidades] = useState([]);
  const [loadingSetores, setLoadingSetores] = useState(true);
  const [loadingCargos, setLoadingCargos] = useState(true);
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

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const setores = await setoresPorEmpresa();
        setOpcoesSetores(
          setores.map((h) => ({ value: h.id, label: h.nome })) || []
        );
      } finally {
        setLoadingSetores(false);
      }
    };

    const carregarCargos = async () => {
      try {
        const cargos = await listarCargos();
        setOpcoesCargos(
          cargos.map((h) => ({ value: h.id, label: h.nome })) || []
        );
      } finally {
        setLoadingCargos(false);
      }
    };

    const carregarHabilidades = async () => {
      try {
        const habilidades = await habilidadesPorEmpresa();
        setOpcoesHabilidades(
          habilidades.map((h) => ({ value: h.id, label: h.nome })) || []
        );
      } finally {
        setLoadingHabilidades(false);
      }
    };

    carregarSetores();
    carregarCargos();
    carregarHabilidades();
  }, []);

  const maskCpf = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };

  const maskTelefone = (value) => {
    value = value.replace(/\D/g, "").slice(0, 11);
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") formattedValue = maskCpf(value);
    if (name === "telefone") formattedValue = maskTelefone(value);

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleChangeSelect = (event) => {
    const {
      target: { value, name },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({ mensagem: "", tipo: "" });

    if (
      !formData.nomeCompleto.trim() ||
      !formData.email.trim() ||
      !formData.cpf.trim() ||
      !formData.telefone.trim() ||
      !formData.setor ||
      !formData.cargo ||
      formData.habilidades.length === 0
    ) {
      setAlerta({
        id: Date.now(),
        mensagem: "Preencha todos os campos obrigatórios.",
        tipo: "aviso",
      });
      return;
    }

    if (!validarCPF(formData.cpf)) {
      setAlerta({
        id: Date.now(),
        mensagem: "CPF inválido. Verifique e tente novamente.",
        tipo: "erro",
      });
      return;
    }

    if (!validarEmail(formData.email)) {
      setAlerta({
        id: Date.now(),
        mensagem: "E-mail inválido.",
        tipo: "erro",
      });
      return;
    }

    if (!validarTelefone(formData.telefone)) {
      setAlerta({
        id: Date.now(),
        mensagem: "Telefone inválido.",
        tipo: "erro",
      });
      return;
    }

    setLoading(true);

    const payload = {
      nome: formData.nomeCompleto,
      email: formData.email.trim(),
      telefone: formData.telefone.trim(),
      cpf: formData.cpf.trim(),
      booleanGestor: formData.gestao === "true",
      setorId: Number(formData.setor),
      cargoId: Number(formData.cargo),
    };

    try {
      const novoUsuario = await adicionarUsuario(payload);

      try {
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
        setTimeout(() => onClose(), 1500);
      } catch {
        console.warn("Erro ao adicionar habilidades. Revertendo usuário...");
        await deletarUsuario(novoUsuario.id);
      }
    } catch (error) {
      setAlerta({
        id: Date.now(),
        mensagem: "Erro ao adicionar usuário. Tente novamente.",
        tipo: "erro",
      });
      console.error(error);
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
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
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
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
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
