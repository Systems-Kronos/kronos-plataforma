import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import Button from "../Button";
import FormsCriarTarefa from "../FormsCriarTarefa";
import { useNavigate, useLocation } from "react-router-dom";
import { avisosDeHojePorGestor } from "../../service/avisos";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [avisosPendentes, setAvisosPendentes] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

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

  const handleNavigation = (rota) => {
    navigate(rota);
    setMenuAberto(false);
  };

  const handleCriarTarefa = () => {
    setShowPopup(true);
    setMenuAberto(false);
  };

  const renderBotoes = () => (
    <>
      <Button
        texto={"Notícias"}
        variant={location.pathname === "/noticias" ? "amarelo" : "secundario"}
        onClick={() => handleNavigation("/noticias")}
      />
      <div className={styles.avisosButton}>
        <Button
          texto={"Equipe"}
          variant={location.pathname === "/equipe" ? "amarelo" : "secundario"}
          onClick={() => handleNavigation("/equipe")}
        />
        {avisosPendentes > 0 && (
          <span
            className={
              location.pathname === "/equipe"
                ? styles.marcadorSelect
                : styles.marcadorNoSelect
            }
          >
            !
          </span>
        )}
      </div>
      <Button
        texto={"Reports"}
        variant={location.pathname === "/reports" ? "amarelo" : "secundario"}
        onClick={() => handleNavigation("/reports")}
      />
      <Button
        texto={"Tarefas"}
        variant={location.pathname === "/tarefas" ? "amarelo" : "secundario"}
        onClick={() => handleNavigation("/tarefas")}
      />
      <Button
        texto={"Criar Tarefas"}
        variant={location.pathname === "/criar-tarefa" ? "lilas" : "primario"}
        onClick={handleCriarTarefa}
      />
    </>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo} onClick={() => handleNavigation("/home")}>
        KRONOS
      </h1>

      <nav className={styles.navegation}>{renderBotoes()}</nav>

      <div
        className={styles.menuIcon}
        onClick={() => setMenuAberto(!menuAberto)}
      >
        {menuAberto ? <CloseIcon /> : <MenuIcon />}
      </div>

      <div
        className={`${styles.mobileMenu} ${
          menuAberto ? styles.mobileMenuAberto : ""
        }`}
      >
        {renderBotoes()}
      </div>

      {showPopup && <FormsCriarTarefa onClose={() => setShowPopup(false)} />}
    </div>
  );
}
