import "./style.css";
import { useState, useEffect } from "react";
import Button from "../Button";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CardReports({
  titulo,
  descricao,
  data,
  nomeResponsavel,
  fotoResponsavel,
}) {
  const storageKey = `concluido_${titulo}`;
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem(storageKey);
    if (salvo === "true") setConcluido(true);
  }, [storageKey]);

  function concluirTarefa() {
    setConcluido(true);
    localStorage.setItem(storageKey, "true");
  }

  return (
    <div className="card-reports">
      <div className="card-header">
        <div className="header-titulo">
          {concluido ? (
            <CheckCircleIcon
              style={{ color: "#e6b648", marginRight: "0.5rem" }}
            />
          ) : (
            <ErrorIcon style={{ color: "#e6b648", marginRight: "0.5rem" }} />
          )}
          <h2>{titulo}</h2>
        </div>

        <div>
          <Button
            texto={concluido ? "Concluído" : "Pendente"}
            variant={concluido ? "primario" : "secundario"}
          />
          {!concluido && (
            <Button
              texto={"Concluir"}
              variant="secundario"
              onClick={concluirTarefa}
            />
          )}
        </div>
      </div>

      <p className="descricao">{descricao}</p>

      <div className="card-footer">
        <div className="responsavel">
          <img src={fotoResponsavel} alt="fotoResponsavel" />
          <h4>{nomeResponsavel}</h4>
        </div>
        <div className="data">
          <CalendarMonthIcon color="grey" />
          <h4>{data}</h4>
        </div>
      </div>
    </div>
  );
}
