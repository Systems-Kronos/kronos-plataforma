import styles from "./Alert.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function Alert({ mensagem, tipo }) {
  if (!mensagem) return null;

  const Icon =
    tipo === "sucesso"
      ? CheckCircleIcon
      : tipo === "aviso"
      ? WarningAmberIcon
      : ErrorIcon;

  return (
    <div
      className={`${styles.alerta} ${
        tipo === "sucesso"
          ? styles.alertaSucesso
          : tipo === "aviso"
          ? styles.alertaAviso
          : styles.alertaErro
      }`}
    >
      <Icon className={styles.icon} />
      <span>{mensagem}</span>
    </div>
  );
}
