import styles from "./CardReports.module.css";
import { useState, useEffect } from "react";
import Button from "../Button";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function CardReports({
  titulo,
  descricao,
  data,
  tituloTarefa,
  nomeResponsavel,
  fotoResponsavel,
}) {
  const storageKey = `concluido_${titulo}`;
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem(storageKey);
    if (salvo === "true") setConcluido(true);
  }, [storageKey]);

  function concluirTarefa() {
    setConcluido(true);
    localStorage.setItem(storageKey, "true");
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
          <img src={fotoResponsavel} alt="fotoResponsavel" />
          <h4>{nomeResponsavel}</h4>
        </div>
        <div className={styles.data}>
          <CalendarMonthIcon color="grey" />
          <h4>{data}</h4>
        </div>
        <div className={styles.tarefa}>
          <AssignmentIcon color="grey" />
          <h4>{tituloTarefa}</h4>
        </div>
      </div>
    </div>
  );
}
