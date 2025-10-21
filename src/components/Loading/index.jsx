import styles from "./Loading.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <CircularProgress size={70} thickness={5} sx={{ color: "#ffffff" }} />
    </div>
  );
}
