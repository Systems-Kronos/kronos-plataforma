import styles from "./Header.module.css";
import { useState } from "react";
import Button from "../Button";
import FormsCriarTarefa from "../FormsCriarTarefa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo} onClick={() => navigate("/")}>
        KRONOS
      </h1>

      <div className={styles.navegation}>
        <Button
          texto={"Análises"}
          variant={location.pathname === "/analises" ? "amarelo" : "secundario"}
          onClick={() => navigate("/analises")}
        />
        <Button
          texto={"Membros"}
          variant={
            location.pathname === "/membros-equipe" ? "amarelo" : "secundario"
          }
          onClick={() => navigate("/membros-equipe")}
        />
        <Button
          texto={"Reports"}
          variant={location.pathname === "/reports" ? "amarelo" : "secundario"}
          onClick={() => navigate("/reports")}
        />
        <Button
          texto={"Tarefas"}
          variant={location.pathname === "/tarefas" ? "amarelo" : "secundario"}
          onClick={() => navigate("/tarefas")}
        />
        <Button
          texto={"Criar Tarefas"}
          variant={location.pathname === "/criar-tarefa" ? "lilas" : "primario"}
          onClick={() => setShowPopup(true)}
        />
      </div>

      {showPopup && <FormsCriarTarefa onClose={() => setShowPopup(false)} />}
    </div>
  );
}
