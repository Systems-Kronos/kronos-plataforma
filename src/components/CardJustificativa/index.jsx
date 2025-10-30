import styles from "./CardJustificativa.module.css";
import { useState } from "react";
import Button from "../Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { atualizarStatusAviso } from "../../service/avisos";

export default function CardJustificativa({
  id,
  presenca,
  observacao,
  data,
  atestado,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });

  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleEditar = async () => {
    setAlerta({ mensagem: "", tipo: "" });
    setLoading(true);

    try {
      await atualizarStatusAviso(id);

      setAlerta({
        id: Date.now(),
        mensagem: "Falta aceita com sucesso!",
        tipo: "sucesso",
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch {
      setAlerta({
        id: Date.now(),
        mensagem: "Erro ao aceitar falta.",
        tipo: "erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cardJustificativa}>
      {loading && <Loading />}

      {alerta.mensagem && (
        <Alert key={alerta.id} mensagem={alerta.mensagem} tipo={alerta.tipo} />
      )}

      <div className={styles.header}>
        <h2>{presenca ? "Aviso de observação!" : "Aviso de falta!"}</h2>
        <CancelIcon
          style={{ color: "#370963", cursor: "pointer" }}
          onClick={onClose}
        />
      </div>

      <p className={styles.observacao}>{observacao || "Sem descrição"}</p>

      <div className={styles.detalhes}>
        <div className={styles.data}>
          <CalendarMonthIcon color="grey" />
          <h5>{dataFormatada}</h5>
        </div>
        <div className={styles.anexo}>
          <AttachFileIcon color="grey" />
          <h5>
            {atestado ? (
              <a href={atestado} target="_blank">
                1 anexo
              </a>
            ) : (
              "Sem anexo"
            )}
          </h5>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button texto={"Aceitar"} variant={"primario"} onClick={handleEditar} />
      </div>
    </div>
  );
}
