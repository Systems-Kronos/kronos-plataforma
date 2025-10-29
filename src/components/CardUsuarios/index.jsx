import styles from "./CardUsuarios.module.css";
import { useState, useEffect } from "react";
import Button from "../Button";
import CardJustificativa from "../CardJustificativa";
import CardEditarUsuarios from "../FormsEditarUsuario";
import ErrorIcon from "@mui/icons-material/Error";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { habilidadesPorUsuario } from "../../service/habilidades";

export default function CardUsuarios({
  idUsuario,
  nomeUsuario,
  fotoUsuario,
  emailUsuario,
  telefoneUsuario,
  idCargo,
  cargoUsuario,
  idSetor,
  setorUsuario,
  statusUsuario,
  tarefasConcluidas,
  possuiCargoGestoria,
  avisoHoje,
}) {
  const [habilidades, setHabilidades] = useState([]);
  const [openEdicao, setOpenEdicao] = useState(false);
  const [openJustificativa, setOpenJustificativa] = useState(false);
  const [exibirTodasHabilidades, setExibirTodasHabilidades] = useState(false);

  useEffect(() => {
    const carregarHabilidades = async () => {
      try {
        const resultado = await habilidadesPorUsuario(idUsuario);
        let habilidadesArray = Array.isArray(resultado)
          ? resultado
          : [resultado];

        const nomesHabilidades = habilidadesArray
          .filter((h) => h && h.habilidade && h.habilidade.nome)
          .map((h) => h.habilidade.nome);

        setHabilidades(nomesHabilidades);
      } catch (error) {
        console.error("Erro ao carregar habilidades:", error);
      }
    };

    carregarHabilidades();
  }, [idUsuario]);

  const temMaisDeUma = habilidades.length > 1;

  return (
    <div className={styles.cardUsuarios}>
      <div className={styles.headerCardUsuarios}>
        <div className={styles.responsavel}>
          <img
            src={
              fotoUsuario
                ? fotoUsuario
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nomeUsuario
                  )}&background=C2C2C2&color=000000&rounded=true&size=128`
            }
            alt={nomeUsuario}
          />
          <div>
            <h4>{nomeUsuario}</h4>
            <p>{cargoUsuario}</p>
          </div>
        </div>
        {avisoHoje.length > 0 && (
          <ErrorIcon
            style={{ color: "#E6B648", cursor: "pointer" }}
            onClick={() => setOpenJustificativa(true)}
          />
        )}
      </div>

      <div className={styles.contato}>
        <div>
          <EmailIcon style={{ color: "#E6B648" }} />
          <p>{emailUsuario}</p>
        </div>
        <div>
          <LocalPhoneIcon style={{ color: "#E6B648" }} />
          <p>{telefoneUsuario}</p>
        </div>
      </div>

      <hr className={styles.divisao} />

      <div className={styles.informacoes}>
        <div className={styles.info}>
          <p>Setor:</p>
          <p>{setorUsuario}</p>
        </div>
        <div className={styles.info}>
          <p>Tarefas Concluídas:</p>
          <p>{tarefasConcluidas}</p>
        </div>
        <div className={styles.infoHabilidades}>
          <p>Habilidades:</p>
          <ul className={styles.listaHabilidades}>
            {!exibirTodasHabilidades &&
              habilidades
                .slice(0, 1)
                .map((habilidade) => <li key={habilidade}>{habilidade}</li>)}

            {temMaisDeUma && !exibirTodasHabilidades && (
              <li
                className={styles.maisHabilidades}
                onClick={() => setExibirTodasHabilidades(true)}
              >
                ...
              </li>
            )}

            {exibirTodasHabilidades &&
              habilidades.map((habilidade) => (
                <li key={habilidade}>{habilidade}</li>
              ))}

            {exibirTodasHabilidades && temMaisDeUma && (
              <li
                className={styles.maisHabilidades}
                onClick={() => setExibirTodasHabilidades(false)}
              >
                Ver menos
              </li>
            )}
          </ul>
        </div>
        <div className={styles.info}>
          <p>É gestor?</p>
          <p>{possuiCargoGestoria ? "Sim" : "Não"}</p>
        </div>
        <div className={styles.info}>
          <p>Status:</p>
          <p>{statusUsuario ? "Ativo" : "Desligado"}</p>
        </div>
      </div>

      <Button
        texto={"Editar"}
        variant={"lilas"}
        onClick={() => setOpenEdicao(true)}
      />

      {openEdicao && (
        <div className={styles.popupOverlay}>
          <CardEditarUsuarios
            onClose={() => setOpenEdicao(false)}
            membro={{
              idUsuario,
              nomeUsuario,
              idSetor,
              idCargo,
              emailUsuario,
              telefoneUsuario,
              possuiCargoGestoria,
              statusUsuario,
            }}
          />
        </div>
      )}
      {openJustificativa && (
        <div className={styles.popupOverlay}>
          <CardJustificativa
            id={avisoHoje[0].id}
            presenca={avisoHoje[0].presenca}
            observacao={avisoHoje[0].observacao}
            data={avisoHoje[0].dia}
            atestado={avisoHoje[0].atestado}
            onClose={() => setOpenJustificativa(false)}
          />
        </div>
      )}
    </div>
  );
}
