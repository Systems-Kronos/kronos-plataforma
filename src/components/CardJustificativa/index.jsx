import styles from "./CardJustificativa.module.css";
import Button from "../Button";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function CardJustificativa({ descricao, data, anexo, id }) {
  const [status, setStatus] = useState("");
  const storageKey = `cardJustificativaStatus_${id ?? data ?? descricao}`;

  useEffect(() => {
    const savedStatus = localStorage.getItem(storageKey);
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, [storageKey]);

  const handleClick = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem(storageKey, newStatus);
  };

  return (
    <div className={styles.cardJustificativa}>
      <div className={styles.header}>
        <h2>Justificativa de falta!</h2>
        <CancelIcon style={{ color: "#370963" }} />
      </div>

      <p className={styles.descricao}>{descricao}</p>

      <div className={styles.detalhes}>
        <div className={styles.data}>
          <CalendarMonthIcon color="grey" />
          <h4>{data}</h4>
        </div>
        <div className={styles.anexo}>
          <AttachFileIcon color="grey" />
          <h5>
            <a href="">{anexo} anexo(s)</a>
          </h5>
        </div>
      </div>

      <div className={styles.footer}>
        {status === "" && (
          <>
            <Button
              texto="Negar"
              variant="secundario"
              onClick={() => handleClick("negada")}
            />
            <Button
              texto="Aceitar"
              variant="secundario"
              onClick={() => handleClick("aceita")}
            />
          </>
        )}
        {status === "negada" && (
          <Button texto="Falta Negada" variant="primario" onClick={() => {}} />
        )}
        {status === "aceita" && (
          <Button texto="Falta Aceita" variant="primario" onClick={() => {}} />
        )}
      </div>
    </div>
  );
}
