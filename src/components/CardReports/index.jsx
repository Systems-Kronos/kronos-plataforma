import styles from "./CardReports.module.css";
import { useState } from "react";
import Button from "../Button";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { atualizarStatusReport } from "../../service/reports";

export default function CardReports({
  idReport,
  titulo,
  descricao,
  tituloTarefa,
  nomeResponsavel,
  fotoResponsavel,
  status,
  onAtualizar,
}) {
  const [concluido, setConcluido] = useState(status === "Concluído");

  async function concluirTarefa() {
    try {
      await atualizarStatusReport(idReport, "Concluído");
      setConcluido(true);
      if (onAtualizar) {
        onAtualizar();
      }
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
      alert("Não foi possível atualizar o status do report.");
    }
  }

  return (
    <div className={styles.cardReports}>
      <div className={styles.cardHeader}>
        <div className={styles.headerTitulo}>
          {concluido ? (
            <CheckCircleIcon
              style={{ color: "#e6b648", marginRight: "0.5rem" }}
            />
          ) : (
            <ErrorIcon style={{ color: "#e6b648", marginRight: "0.5rem" }} />
          )}
          <h2>{titulo}</h2>
        </div>

        <div>
          <Button
            texto={concluido ? "Concluído" : "Pendente"}
            variant={concluido ? "primario" : "secundario"}
          />
          {!concluido && (
            <Button
              texto={"Concluir"}
              variant="secundario"
              onClick={concluirTarefa}
            />
          )}
        </div>
      </div>

      <p className={styles.descricao}>{descricao}</p>

      <div className={styles.cardFooter}>
        <div className={styles.responsavel}>
          <img
            src={
              fotoResponsavel
                ? fotoResponsavel
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nomeResponsavel
                  )}&background=C2C2C2&color=000000&rounded=true&size=128`
            }
            alt={nomeResponsavel}
          />
          <h4>{nomeResponsavel}</h4>
        </div>
        <div className={styles.tarefa}>
          <AssignmentIcon color="grey" />
          <h4>{tituloTarefa}</h4>
        </div>
      </div>
    </div>
  );
}
