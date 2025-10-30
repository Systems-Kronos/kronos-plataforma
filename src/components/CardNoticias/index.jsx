import styles from "./CardNoticias.module.css";

export default function CardNoticias({
  titulo,
  subtitulo,
  imagem,
  dataPublicacao,
  nomeAutor,
  imagemAutor,
  linkNoticia,
}) {
  return (
    <div className={styles.cardNoticias}>
      <a href={linkNoticia} target="_blank" className={styles.link}>
        <img
          src={imagem}
          alt="Imagem da notícia"
          className={styles.imagemPrincipal}
        />

        <div className={styles.conteudo}>
          <h2 className={styles.titulo}>{titulo}</h2>
          <h4 className={styles.subtitulo}>{subtitulo}</h4>

          <div className={styles.footer}>
            {nomeAutor && (
              <div className={styles.autor}>
                {imagemAutor && (
                  <img
                    src={imagemAutor}
                    alt="Imagem do autor"
                    className={styles.imagemAutor}
                  />
                )}
                <p>{nomeAutor}</p>
              </div>
            )}

            <p>
              <strong style={{ color: "#E6B648" }}>Data publicação: </strong>
              {dataPublicacao}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
