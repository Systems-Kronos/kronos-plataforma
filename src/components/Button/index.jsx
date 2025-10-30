import styles from "./Button.module.css";

export default function Button({ texto, onClick, variant }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${onClick ? styles.clicavel : styles.naoClicavel}`}
      type="button"
      onClick={onClick}
      disabled={!onClick}
    >
      {texto}
    </button>
  );
}
