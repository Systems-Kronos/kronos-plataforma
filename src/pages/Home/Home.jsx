import styles from "./Home.module.css";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Home() {
  return (
    <div className={styles.boxContainer}>
      <h1>Dashboard do Gestor</h1>

      <iframe
        src="https://app.powerbi.com/groups/me/reports/e2211bc2-9b2d-46d6-8900-601c1f4120c3/926e2c3cb6738de77a06?experience=power-bi"
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
