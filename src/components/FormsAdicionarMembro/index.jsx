import { useState, useEffect } from "react";
import styles from "./FormsAdicionarMembro.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { listarCargos } from "../../service/cargos";
import { setoresPorEmpresa } from "../../service/setores";
import { adicionarUsuario } from "../../service/usuarios";

export default function FormsAdicionarMembro({ onClose }) {
  const [step, setStep] = useState(1);
  const [opcoesSetores, setOpcoesSetores] = useState([]);
  const [loadingSetores, setLoadingSetores] = useState(true);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [loadingCargos, setLoadingCargos] = useState(true);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    setor: "",
    cargo: "",
    gestao: false,
    habilidades: "",
  });

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const setores = await setoresPorEmpresa();
        setOpcoesSetores(setores || []);
      } catch (err) {
        console.error("Erro ao carregar setores:", err);
      } finally {
        setLoadingSetores(false);
      }
    };

    const carregarCargos = async () => {
      try {
        const cargos = await listarCargos();
        setOpcoesCargos(cargos || []);
      } catch (err) {
        console.error("Erro ao carregar cargos:", err);
      } finally {
        setLoadingCargos(false);
      }
    };

    carregarSetores();
    carregarCargos();
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
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nomeCompleto || !formData.email || !formData.cpf || !formData.setor || !formData.cargo) {
            alert("Por favor, preencha todos os campos obrigatórios.");
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
            await adicionarUsuario(payload);
            
            alert("Usuário adicionado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            alert("Erro ao adicionar usuário. Tente novamente.");
        }
    };

  return (
    <div className={styles.formsModal}>
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
                  value={"+55 "+formData.telefone}
                  onChange={handleChange}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="setor">Setor</label>
                    <select
                      id="setor"
                      name="setor"
                      className={styles.inputSelect}
                      value={formData.setor}
                      onChange={handleChange}
                      disabled={loadingSetores}
                    >
                      {loadingSetores ? (
                        <option>Carregando...</option>
                      ) : (
                        <>
                          <option value="">Selecione</option>
                          {opcoesSetores.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nome}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gestao">Permitir gestão</label>
                    <select
                      id="gestao"
                      name="gestao"
                      className={styles.inputSelect}
                      value={formData.gestao}
                      onChange={handleChange}
                    >
                      <option value="false">Não</option>
                      <option value="true">Sim</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cargo">Cargo</label>
                  <select
                    id="cargo"
                    name="cargo"
                    className={styles.inputSelect}
                    value={formData.cargo}
                    onChange={handleChange}
                    disabled={loadingCargos}
                  >
                    {loadingCargos ? (
                      <option>Carregando...</option>
                    ) : (
                      <>
                        <option value="">Selecione</option>
                        {opcoesCargos.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nome}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="habilidades">Habilidades</label>
                  <input
                    type="text"
                    id="habilidades"
                    name="habilidades"
                    className={styles.inputText}
                    placeholder="Ex: Excel, Liderança, Comunicação"
                    value={formData.habilidades}
                    onChange={handleChange}
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
