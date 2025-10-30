import styles from "./Busca.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function Busca({ placeholder = "Buscar", value, onChange }) {
  return (
    <div className={styles.buscaContainer}>
      <SearchIcon className={styles.buscaIcone} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.buscaInput}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
