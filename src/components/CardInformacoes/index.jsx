import styles from "./CardInformacoes.module.css";

export default function CardInformacoes({ titulo, icone, numero, descricao }) {
  return (
    <div className={styles.cardInformacoes}>
      <div className={styles.headerCardInformacoes}>
        <h2>{titulo}</h2>
        <div className={styles.icone}>{icone}</div>
      </div>

      <div className={styles.bodyCardInformacoes}>
        <h1>{numero}</h1>
        <p>{descricao}</p>
      </div>
    </div>
  );
}
