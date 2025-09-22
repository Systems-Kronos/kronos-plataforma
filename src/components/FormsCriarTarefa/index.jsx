import styles from "./FormsCriarTarefa.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

export default function FormsCriarTarefa({ onClose }) {
  return (
    <div className={styles.formsModal}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Criar nova tarefa</h2>
            <p>Preencha todas as informações para a criação da tarefa!</p>
          </div>
          <CancelIcon
            style={{ color: "#370963", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className={styles.modalBody}>
          <form>
            <label htmlFor="titulo">Título da Tarefa</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className={styles.inputText}
              placeholder="Digite o título da tarefa"
            />

            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              className={styles.inputText}
              placeholder="Descreva os detalhes da tarefa"
            ></input>

            <label htmlFor="habilidades">Habilidades</label>
            <select
              id="habilidades"
              name="habilidades"
              className={styles.inputSelect}
            >
              <option value="">Selecione</option>
            </select>

            <div className={styles.formRow}>
              <div>
                <label htmlFor="setor">Setor</label>
                <select id="setor" name="setor" className={styles.inputSelect}>
                  <option value="">Selecione</option>
                </select>
              </div>

              <div>
                <label htmlFor="prioridade">Prioridade</label>
                <select
                  id="prioridade"
                  name="prioridade"
                  className={styles.inputSelect}
                >
                  <option value="">Selecione</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div>
                <label htmlFor="data">Data de vencimento</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  className={styles.inputDate}
                />
              </div>

              <div>
                <label htmlFor="atribuir">Atribuir à</label>
                <select id="atribuir" name="atribuir" className={styles.inputSelect}>
                  <option value="">Selecione</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <Button texto="Cancelar" variant="secundario" onClick={onClose} />
          <Button
            texto="Criar"
            variant="primario"
            onClick={() => console.log("Criar Tarefa")}
          />
        </div>
      </div>
    </div>
  );
}
