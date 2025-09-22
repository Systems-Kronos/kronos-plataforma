import styles from "./FormsEditarUsuario.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";
import { useState } from "react";

export default function FormsEditarMembro({ onClose }) {
  const [ativo, setAtivo] = useState(true);

  return (
    <div className={styles.formsModal}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Editar membro</h2>
            <p>Preencha todas as informações para editar o cadastro!</p>
          </div>
          <CancelIcon
            style={{ color: "#370963", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className={styles.modalBody}>
          <form>
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              className={styles.inputText}
              placeholder="Digite o nome completo"
            />

            <div className={styles.formRow}>
              <div>
                <label htmlFor="setor">Setor</label>
                <select id="setor" name="setor" className={styles.inputSelect}>
                  <option value="">Selecione</option>
                </select>
              </div>

              <div>
                <label htmlFor="gestao">Permitir gestão</label>
                <select id="gestao" name="gestao" className={styles.inputSelect}>
                  <option value="">Selecione</option>
                </select>
              </div>
            </div>

            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              className={styles.inputText}
              placeholder="Digite o e-mail empresarial"
            ></input>

            <button
              type="button"
              className={`${styles.button} ${ativo ? styles.Ativo : styles.Desligado}`}
              style={{
                backgroundColor: ativo ? "#EADAF5" : "#fff",
                border: ativo ? "3px solid #EADAF5" : "3px solid #c2c2c2",
                color: "#370963",
              }}
              onClick={() => setAtivo(!ativo)}
            >
              {ativo ? "Ativo" : "Desligado"}
            </button>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <Button texto="Cancelar" variant="secundario" onClick={onClose} />
          <Button
            texto="Editar"
            variant="primario"
            onClick={() => console.log("Criar Tarefa")}
          />
        </div>
      </div>
    </div>
  );
}
