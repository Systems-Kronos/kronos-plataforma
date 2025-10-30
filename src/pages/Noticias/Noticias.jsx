import styles from "./Noticias.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CardNoticias from "../../components/CardNoticias";
import { noticiasRpa } from "../../service/noticias";

export default function Noticias() {
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        const response = await noticiasRpa();
        setNoticias(response || []);
      } catch {
        setErro("Erro ao carregar notícias.");
      } finally {
        setLoading(false);
      }
    };

    carregarNoticias();
  }, []);

  return (
    <div className={styles.boxContainer}>
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <h1>Notícias do momento</h1>
      </div>

      <div className={styles.noticiasContainer}>
        {loading ? (
          <p className={styles.loading}>Carregando notícias...</p>
        ) : erro ? (
          <p className={styles.erro}>{erro}</p>
        ) : (
          noticias.map((noticia, index) => (
            <CardNoticias
              key={index}
              titulo={noticia.titulo}
              subtitulo={noticia.subtitulo}
              imagem={noticia.imagem}
              dataPublicacao={noticia.data_publicacao}
              nomeAutor={noticia.nome_autor}
              imagemAutor={noticia.imagem_perfil_autor}
              linkNoticia={noticia.link_noticia}
            />
          ))
        )}
      </div>
    </div>
  );
}
