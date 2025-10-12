import styles from "./FormsEditarUsuario.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { useState, useEffect } from "react";
import { setoresPorEmpresa } from "../../service/setores";
import { listarCargos } from "../../service/cargos";
import { atualizarUsuario } from "../../service/usuarios";

export default function FormsEditarMembro({ onClose, membro }) {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState(membro?.nomeUsuario);
  const [email, setEmail] = useState(membro?.emailUsuario);
  const [telefone, setTelefone] = useState(membro?.telefoneUsuario);
  const [setor, setSetor] = useState(membro?.idSetor);
  const [cargo, setCargo] = useState(membro?.idCargo);
  const [gestao, setGestao] = useState(membro?.possuiCargoGestoria ? "true" : "false");
  const [ativo, setAtivo] = useState(membro?.statusUsuario);
  const [opcoesSetores, setOpcoesSetores] = useState([]);
  const [opcoesCargos, setOpcoesCargos] = useState([]);
  const [loadingSetores, setLoadingSetores] = useState(true);
  const [loadingCargos, setLoadingCargos] = useState(true);

  const handleTelefoneChange = (evento) => {
    let value = evento.target.value.replace(/\D/g, "");

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

    setTelefone(value);
  };

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

  const handleEditar = async () => {
    const dadosAtualizados = {};

    if (nome !== membro?.nomeUsuario) {
      dadosAtualizados.nome = nome;
    }

    if (email !== membro?.emailUsuario) {
      dadosAtualizados.email = email;
    }

    if (telefone !== membro?.telefoneUsuario) {
      dadosAtualizados.telefone = telefone;
    }

    if (setor !== membro?.idSetor) {
      dadosAtualizados.setor = setor;
    }

    if (cargo !== membro?.idCargo) {
      dadosAtualizados.cargo = cargo;
    }

    const gestaoBoolean = gestao === "true"; 
    if (gestaoBoolean !== membro?.possuiCargoGestoria) {
      dadosAtualizados.booleanGestor = gestaoBoolean;
    }

    if (ativo !== membro?.statusUsuario) {
      dadosAtualizados.ativo = ativo;
    }

    if (Object.keys(dadosAtualizados).length === 0) {
      alert("Nenhuma alteração foi feita.");
      return;
    }

    try {
      await atualizarUsuario({
        idUsuario: membro.idUsuario,
        ...dadosAtualizados,
      });

      alert("Usuário atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      alert("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return (
    <div className={styles.formsModal}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Editar membro</h2>
            <p>Atualize as informações do cadastro.</p>
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
                <label htmlFor="nomeCompleto">Nome Completo</label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  className={styles.inputText}
                  placeholder="Digite o nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={styles.inputText}
                  placeholder="Digite o e-mail empresarial"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="telefone">Telefone</label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  className={styles.inputText}
                  placeholder="+55 (xx) xxxxx-xxxx"
                  value={`+55 ${telefone}`}
                  onChange={handleTelefoneChange}
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
                      value={setor}
                      onChange={(e) => setSetor(Number(e.target.value))}
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
                      value={gestao}
                      onChange={(e) => setGestao(e.target.value)}
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
                    value={cargo}
                    onChange={(e) => setCargo(Number(e.target.value))}
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
                  <label>Status</label>
                  <button
                    type="button"
                    className={`${styles.button} ${
                      ativo ? styles.Ativo : styles.Desligado
                    }`}
                    style={{
                      backgroundColor: ativo ? "#EADAF5" : "#fff",
                      border: ativo ? "3px solid #EADAF5" : "3px solid #c2c2c2",
                      color: "#370963",
                    }}
                    onClick={() => setAtivo(!ativo)}
                  >
                    {ativo ? "Ativo" : "Desligado"}
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
              <Button
                texto="Próximo"
                variant="primario"
                onClick={() => setStep(2)}
              />
            </>
          ) : (
            <>
              <Button
                texto="Voltar"
                variant="secundario"
                onClick={() => setStep(1)}
              />
              <Button
                texto="Editar"
                variant="primario"
                onClick={handleEditar}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
