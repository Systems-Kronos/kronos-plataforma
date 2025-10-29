import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Button from "../Button";
import FormsCriarTarefa from "../FormsCriarTarefa";
import { useNavigate, useLocation } from "react-router-dom";
import { avisosDeHojePorGestor } from "../../service/avisos";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [avisosPendentes, setAvisosPendentes] = useState(false);

  useEffect(() => {
    const carregarAvisos = async () => {
      try {
        const avisos = await avisosDeHojePorGestor();
        setAvisosPendentes(avisos && avisos.length > 0);
      } catch (error) {
        console.error("Erro ao carregar avisos:", error);
      }
    };

    carregarAvisos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo} onClick={() => navigate("/home")}>
        KRONOS
      </h1>

      <div className={styles.navegation}>
        <Button
          texto={"Notícias"}
          variant={location.pathname === "/noticias" ? "amarelo" : "secundario"}
          onClick={() => navigate("/noticias")}
        />
        <div className={styles.avisosButton}>
          <Button
            texto={"Equipe"}
            variant={location.pathname === "/equipe" ? "amarelo" : "secundario"}
            onClick={() => navigate("/equipe")}
          />
          {avisosPendentes && (
            <span
              className={
                location.pathname === "/equipe"
                  ? styles.marcadorSelect
                  : styles.marcadorNoSelect
              }>!</span>
          )}
        </div>

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
