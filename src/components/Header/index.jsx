import "./style.css";
import Button from "../Button";
import { useNavigate, useLocation } from "react-router-dom";
import fotoPerfilDefault from "../../assets/fotoPerfilDefault.png";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="container">
            <h1 className="titulo" onClick={() => navigate("/")}>KRONOS</h1>

            <div className="navegation">
                <Button text={"Análises"}
                    variant={location.pathname === "/analises" ? "amarelo" : "secundario"}
                    onClick={() => navigate("/analises")}
                />
                <Button text={"Membros"}
                    variant={location.pathname === "/membros-equipe" ? "amarelo" : "secundario"}
                    onClick={() => navigate("/membros-equipe")}
                />
                <Button text={"Reports"}
                    variant={location.pathname === "/reports" ? "amarelo" : "secundario"}
                    onClick={() => navigate("/reports")}
                />
                <Button text={"Tarefas"}
                    variant={location.pathname === "/tarefas" ? "amarelo" : "secundario"}
                    onClick={() => navigate("/tarefas")}
                />
                <Button text={"Criar Tarefas"}
                    variant={location.pathname === "/criar-tarefa" ? "lilas" : "primario"}
                    onClick={() => navigate("/criar-tarefa")}
                />

                <img src={fotoPerfilDefault} alt="fotoPerfil" className="fotoPerfil" onClick={() => navigate("/perfil")}/>
            </div>
        </div>
    );
}