import styles from "./CardJustificativa.module.css";
import Button from "../Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function CardJustificativa({ descricao, data, anexo, id, onClose }) {
  return (
    <div className={styles.cardJustificativa}>
      <div className={styles.header}>
        <h2>Aviso do dia!</h2>
        <CancelIcon style={{ color: "#370963", cursor: "pointer" }} onClick={onClose} />
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
    </div>
  );
}
