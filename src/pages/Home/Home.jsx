import styles from "./Home.module.css";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Home() {
  return (
    <div className={styles.boxContainer}>
      <h1>Dashboard do Gestor</h1>

      <iframe
        src="https://app.powerbi.com/view?r=eyJrIjoiN2NjMzgxNjEtYTU4NC00NDBlLWE2YTctN2YzNzVlZjIwZjAxIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9"
        allowFullScreen
        loading="lazy"
        title="Relatório Power BI"
        style={{
          marginTop: "2vw",
          width: "100%",
          height: "65vh",
          border: "none",
          borderRadius: "inherit",
        }}
      ></iframe>

      <LogoutIcon
        className={styles.logout}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("usuarioId");
          localStorage.removeItem("empresaId");
          window.location.reload();
        }}
      />
    </div>
  );
}
