import { useState } from "react";
import styles from "./FormsAdicionarMembro.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "../Button";

export default function FormsAdicionarMembro({ onClose }) {
  const [step, setStep] = useState(1);

  // Estado do form
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    email: "",
    setor: "",
    gestao: "",
    habilidades: "",
  });

  // Atualiza valores
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form enviado:", formData);
    onClose();
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
                    >
                      <option value="">Selecione</option>
                      {/* RENDERIZAR OUTRAS OPÇÕES AQUI */}
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
              <Button texto="Adicionar" variant="primario" onClick={handleSubmit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
