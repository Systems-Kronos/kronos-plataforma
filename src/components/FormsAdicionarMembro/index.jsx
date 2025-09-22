import styles from "./FormsAdicionarMembro.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

export default function FormsAdicionarMembro({ onClose }) {
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
          <form>
            <label htmlFor="nomeCompleto">Nome Completo</label>
            <input
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              className={styles.inputText}
              placeholder="Digite o nome completo"
            />

            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className={styles.inputText}
              placeholder="Digite apenas números"
            ></input>

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
          </form>
        </div>

        <div className={styles.modalFooter}>
          <Button texto="Cancelar" variant="secundario" onClick={onClose} />
          <Button
            texto="Adicionar"
            variant="primario"
            onClick={() => console.log("Criar Tarefa")}
          />
        </div>
      </div>
    </div>
  );
}
