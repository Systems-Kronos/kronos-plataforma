import styles from "./CardUsuarios.module.css";
import { useState } from "react";
import Button from "../Button";
import CardJustificativa from "../CardJustificativa";
import CardEditarUsuarios from "../FormsEditarUsuario";
import ErrorIcon from "@mui/icons-material/Error";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

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
  justificativaHoje,
}) {
  const [openEdicao, setOpenEdicao] = useState(false);
  const [openJustificativa, setOpenJustificativa] = useState(false);

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
        {justificativaHoje && (
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
        <div>
          <p>Setor:</p>
          <p>{setorUsuario}</p>
        </div>
        <div>
          <p>Status:</p>
          <p>{statusUsuario ? "Ativo" : "Desligado"}</p>
        </div>
        <div>
          <p>Tarefas Concluídas:</p>
          <p>{tarefasConcluidas}</p>
        </div>
        <div>
          <p>Possui cargo de gestão?</p>
          <p>{possuiCargoGestoria ? "Sim" : "Não"}</p>
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
          <CardJustificativa onClose={() => setOpenJustificativa(false)} />
        </div>
      )}
    </div>
  );
}
