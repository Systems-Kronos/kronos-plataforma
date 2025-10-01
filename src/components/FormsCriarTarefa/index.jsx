import { useState } from "react";
import styles from "./FormsCriarTarefa.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

export default function FormsCriarTarefa({ onClose }) {
  const [step, setStep] = useState(1); // controla em qual parte está
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    habilidades: "",
    setor: "",
    prioridade: "",
    data: "",
    atribuir: "",
    gravidade: "",
    urgencia: "",
    tendencia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Criar Tarefa", formData);
      onClose(); // fecha modal
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
                <input
                  type="text"
                  id="habilidades"
                  name="habilidades"
                  className={styles.inputText}
                  placeholder="Ex: Excel, Liderança, Comunicação"
                  value={formData.habilidades}
                  onChange={handleChange}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="data">Data de vencimento</label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      className={styles.inputDate}
                      value={formData.data}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="gravidade">Gravidade</label>
                    <select
                      id="gravidade"
                      name="gravidade"
                      className={styles.inputSelect}
                      value={formData.gravidade}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div>
                    <label htmlFor="urgencia">Urgência</label>
                    <select
                      id="urgencia"
                      name="urgencia"
                      className={styles.inputSelect}
                      value={formData.urgencia}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tendencia">Tendência</label>
                    <select
                      id="tendencia"
                      name="tendencia"
                      className={styles.inputSelect}
                      value={formData.tendencia}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="atribuir">Atribuir à</label>
                  <select
                    id="atribuir"
                    name="atribuir"
                    className={styles.inputSelect}
                    value={formData.atribuir}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="setor">Setor</label>
                  <select
                    id="setor"
                    name="setor"
                    className={styles.inputSelect}
                    value={formData.setor}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                  </select>
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
