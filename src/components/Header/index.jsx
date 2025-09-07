import "./style.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import fotoPerfilDefault from "../../assets/fotoPerfilDefault.png";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="titulo" onClick={() => navigate("/")}>KRONOS</h1>

            <div className="navegation">
                <Button text={"Análises"} variant="secundario" onClick={() => navigate("/analises")}/>
                <Button text={"Membros"} variant="secundario" onClick={() => navigate("/membros-equipe")}/>
                <Button text={"Reports"} variant="secundario" onClick={() => navigate("/reports")}/>
                <Button text={"Tarefas"} variant="secundario" onClick={() => navigate("/tarefas")}/>
                <Button text={"Criar Tarefas"} variant="primario" onClick={() => navigate("/criar-tarefa")}/>
                <img src={fotoPerfilDefault} alt="fotoPerfil" className="fotoPerfil" onClick={() => navigate("/perfil")}/>
            </div>
        </div>
    );
}