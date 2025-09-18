import "./style.css";
import { useState } from "react";
import Button from "../Button"
import CardJustificativa from "../CardJustificativa";
import CardEditarUsuarios from "../FormsEditarUsuario";
import ErrorIcon from '@mui/icons-material/Error';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function CardUsuarios({nomeUsuario, fotoUsuario, cargo, emailUsuario, telefoneUsuario, setorUsuario, statusUsuario, tarefasConcluidas, desempenho, justificativaHoje}) {
    const [openEdicao, setOpenEdicao] = useState(false);
    const [openJustificativa, setOpenJustificativa] = useState(false);

    return (
        <div className="card-usuarios">
            <div className="header-card-usuarios">
                <div className="responsavel">
                    <img src={fotoUsuario} alt="fotoResponsavel" />
                    <div>
                        <h4>{nomeUsuario}</h4>
                        <p>{cargo}</p>
                    </div>
                </div>
                {justificativaHoje && (
                    <ErrorIcon style={{ color: "#E6B648", cursor: "pointer" }} onClick={() => setOpenJustificativa(true)} />
                )}
            </div>

            <div className="contato">
                <div>
                    <EmailIcon style={{ color: "#E6B648" }}/>
                    <p>{emailUsuario}</p>
                </div>
                <div>
                    <LocalPhoneIcon style={{ color: "#E6B648" }}/>
                    <p>{telefoneUsuario}</p>
                </div>
            </div>

            <hr className="divisao" />

            <div className="informacoes">
                <div>
                    <p>Setor:</p>
                    <p>{setorUsuario}</p>
                </div>
                <div>
                    <p>Status:</p>
                    <p>{statusUsuario}</p>
                </div>
                <div>
                    <p>Tarefas Concluídas</p>
                    <p>{tarefasConcluidas}</p>
                </div>
                <div>
                    <p>Desempenho:</p>
                    <p>{desempenho}</p>
                </div>
            </div>

            <Button texto={"Editar"} variant={"lilas"} onClick={() => setOpenEdicao(true)}/>

            {openEdicao && (
                <div className="popup-overlay">
                    <CardEditarUsuarios onClose={() => setOpenEdicao(false)} />
                </div>
            )}
            {openJustificativa && (
                <div className="popup-overlay">
                    <CardJustificativa onClose={() => setOpenJustificativa(false)} />
                </div>
            )}
        </div>
    )
}