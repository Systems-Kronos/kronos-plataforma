import styles from "./Noticias.module.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Noticias() {
  const navigate = useNavigate();

  return (
    <div className={styles.boxContainer}>
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <h1>Notícias do momento</h1>
      </div>
    </div>
  );
}
