import "./style.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

export default function FormsCriarTarefa({ onClose }) {
  return (
    <div className="forms-modal">
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h2>Criar nova tarefa</h2>
            <p>Preencha todas as informações para a criação da tarefa!</p>
          </div>
          <CancelIcon
            style={{ color: "#370963", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className="modal-body">
          <form>
            <label htmlFor="titulo">Título da Tarefa</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="input-text"
              placeholder="Digite o título da tarefa"
            />

            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              className="input-text"
              placeholder="Descreva os detalhes da tarefa"
            ></input>

            <label htmlFor="habilidades">Habilidades</label>
            <select
              id="habilidades"
              name="habilidades"
              className="input-select"
            >
              <option value="">Selecione</option>
            </select>

            <div className="form-row">
              <div>
                <label htmlFor="setor">Setor</label>
                <select id="setor" name="setor" className="input-select">
                  <option value="">Selecione</option>
                </select>
              </div>

              <div>
                <label htmlFor="prioridade">Prioridade</label>
                <select
                  id="prioridade"
                  name="prioridade"
                  className="input-select"
                >
                  <option value="">Selecione</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="data">Data de vencimento</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  className="input-date"
                />
              </div>

              <div>
                <label htmlFor="atribuir">Atribuir à</label>
                <select id="atribuir" name="atribuir" className="input-select">
                  <option value="">Selecione</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
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
