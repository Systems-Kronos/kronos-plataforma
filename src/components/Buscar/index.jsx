import styles from "./Buscar.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Buscar({ placeholder = "Buscar", onChange }) {
  return (
    <div className={styles.buscarContainer}>
      <SearchIcon className={styles.buscarIcone} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.buscarInput}
        onChange={onChange}
      />
    </div>
  );
}
