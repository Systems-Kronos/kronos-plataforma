import styles from "./FormsEditarUsuario.module.css";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { setoresPorEmpresa } from "../../service/setores";
import { listarCargos } from "../../service/cargos";
import { atualizarUsuario } from "../../service/usuarios";
import MuiSingleSelect from "../Selects/singleSelect";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { validarEmail, validarTelefone } from "../../utils/validacaoRegex";

const OPCOES_GESTAO = [
  { value: "false", label: "Não" },
  { value: "true", label: "Sim" },
];

export default function FormsEditarMembro({ onClose, membro }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });
  const [opcoesSetores, setOpcoesSetores] = useState([]);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [loadingSetores, setLoadingSetores] = useState(true);
  const [loadingCargos, setLoadingCargos] = useState(true);

  const [formData, setFormData] = useState({
    nomeCompleto: membro?.nomeUsuario || "",
    email: membro?.emailUsuario || "",
    telefone: membro?.telefoneUsuario || "",
    setor: membro?.idSetor || "",
    cargo: membro?.idCargo || "",
    gestao: membro?.possuiCargoGestoria ? "true" : "false",
    ativo: membro?.statusUsuario || false,
  });

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const setores = await setoresPorEmpresa();
        setOpcoesSetores((setores || []).map((h) => ({ value: h.id, label: h.nome })));
      } catch (error) {
        console.error("Erro ao carregar setores:", error);
      } finally {
        setLoadingSetores(false);
      }
    };

    const carregarCargos = async () => {
      try {
        const cargos = await listarCargos();
        setOpcoesCargos((cargos || []).map((h) => ({ value: h.id, label: h.nome })));
      } catch (error) {
        console.error("Erro ao carregar cargos:", error);
      } finally {
        setLoadingCargos(false);
      }
    };

    carregarSetores();
    carregarCargos();
  }, []);

  const maskTelefone = (value) => {
    value = value.replace(/\D/g, "").slice(0, 11);
    if (value.length <= 2) return `(${value}`;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "telefone") formattedValue = maskTelefone(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleEditar = async () => {
    setAlerta({ mensagem: "", tipo: "" });

    if (!validarEmail(formData.email)) {
      setAlerta({ mensagem: "E-mail inválido", tipo: "erro" });
      return;
    }
    if (!validarTelefone(formData.telefone)) {
      setAlerta({ mensagem: "Telefone inválido", tipo: "erro" });
      return;
    }

    const dadosAtualizados = {};
    if (formData.nomeCompleto !== membro?.nomeUsuario) dadosAtualizados.nome = formData.nomeCompleto;
    if (formData.email !== membro?.emailUsuario) dadosAtualizados.email = formData.email;
    if (formData.telefone !== membro?.telefoneUsuario) dadosAtualizados.telefone = formData.telefone;
    if (formData.setor !== membro?.idSetor) dadosAtualizados.setor = formData.setor;
    if (formData.cargo !== membro?.idCargo) dadosAtualizados.cargo = formData.cargo;
    if ((formData.gestao === "true") !== membro?.possuiCargoGestoria)
      dadosAtualizados.booleanGestor = formData.gestao === "true";
    if (formData.ativo !== membro?.statusUsuario) dadosAtualizados.ativo = formData.ativo;

    if (Object.keys(dadosAtualizados).length === 0) {
      setAlerta({ mensagem: "Nenhuma alteração foi feita.", tipo: "aviso" });
      return;
    }

    setLoading(true);
    try {
      await atualizarUsuario({ idUsuario: membro.idUsuario, ...dadosAtualizados });
      setAlerta({ mensagem: "Usuário atualizado com sucesso!", tipo: "sucesso" });
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error(error);
      setAlerta({ mensagem: "Erro ao atualizar usuário.", tipo: "erro" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formsModal}>
      {loading && <Loading />}
      {alerta.mensagem && <Alert key={alerta.id} mensagem={alerta.mensagem} tipo={alerta.tipo} />}

      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Editar membro</h2>
            <p>Atualize as informações do cadastro.</p>
          </div>
          <CancelIcon style={{ color: "#370963", cursor: "pointer" }} onClick={onClose} />
        </div>

        <div className={styles.modalBody}>
          <form>
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
                  <label>Status</label>
                  <button
                    type="button"
                    className={`${styles.button} ${formData.ativo ? styles.Ativo : styles.Desligado}`}
                    style={{
                      backgroundColor: formData.ativo ? "#EADAF5" : "#fff",
                      border: formData.ativo ? "3px solid #EADAF5" : "3px solid #c2c2c2",
                      color: "#370963",
                    }}
                    onClick={() => setFormData({ ...formData, ativo: !formData.ativo })}
                  >
                    {formData.ativo ? "Ativo" : "Desligado"}
                  </button>
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
              <Button texto="Voltar" variant="secundario" onClick={handleBack} />
              <Button texto="Editar" variant="primario" onClick={handleEditar} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
