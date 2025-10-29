import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Button from "../Button";
import FormsCriarTarefa from "../FormsCriarTarefa";
import { useNavigate, useLocation } from "react-router-dom";
import { avisosPorGestor } from "../../service/avisos";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [avisosPendentes, setAvisosPendentes] = useState(false);

  useEffect(() => {
    const carregarAvisos = async () => {
      try {
        const avisos = await avisosPorGestor();

        if (avisos && Array.isArray(avisos)) {
          const diaAtual = new Date().toISOString().split("T")[0];

          const avisosPendentesHoje = avisos.filter((a) => {
            const dataAviso = a.dia ? a.dia.split("T")[0] : null;
            const pendente = a.aceito === false || a.aceito === null;
            return dataAviso === diaAtual && pendente;
          });

          setAvisosPendentes(avisosPendentesHoje.length > 0);
        }
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
            texto={"Membros"}
            variant={location.pathname === "/membros-equipe" ? "amarelo" : "secundario"}
            onClick={() => navigate("/membros-equipe")}
          />
          {avisosPendentes && (
            <span
              className={
                location.pathname === "/membros-equipe"
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
