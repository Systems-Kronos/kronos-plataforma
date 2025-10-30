import styles from "./CardTarefas.module.css";
import { useState } from "react";
import Button from "../Button";

const prioridades = [
  {
    nivel: "Muito Alta",
    svg: (
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 21L11 11.7011L1.5 21L0 19L11 7.5L22 19L20 21Z"
          fill="#FF0004"
        />
        <path
          d="M20 13.5L11 4.20108L1.5 13.5L0 11.5L11 0L22 11.5L20 13.5Z"
          fill="#FF0004"
        />
      </svg>
    ),
  },
  {
    nivel: "Alta",
    svg: (
      <svg
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 13.5L11 4.20108L1.5 13.5L0 11.5L11 0L22 11.5L20 13.5Z"
          fill="#ED6700"
        />
      </svg>
    ),
  },
  {
    nivel: "Moderada",
    svg: (
      <svg
        width="19"
        height="4"
        viewBox="0 0 19 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 2L19 2" stroke="#FFC412" strokeWidth="3" />
      </svg>
    ),
  },
  {
    nivel: "Baixa",
    svg: (
      <svg
        width="22"
        height="14"
        viewBox="0 0 22 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 0L11 9.29892L20.5 0L22 2L11 13.5L0 2L2 0Z" fill="#70E648" />
      </svg>
    ),
  },
  {
    nivel: "Muito Baixa",
    svg: (
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 7.5L11 16.7989L20.5 7.5L22 9.5L11 21L0 9.5L2 7.5Z"
          fill="#48B9E6"
        />
        <path d="M2 0L11 9.29892L20.5 0L22 2L11 13.5L0 2L2 0Z" fill="#48B9E6" />
      </svg>
    ),
  },
];

function definirNivelPrioridade(valor) {
  if (valor >= 0 && valor <= 25) return "Muito Baixa";
  if (valor >= 26 && valor <= 50) return "Baixa";
  if (valor >= 51 && valor <= 75) return "Moderada";
  if (valor >= 76 && valor <= 100) return "Alta";
  if (valor >= 101 && valor <= 125) return "Muito Alta";
  return "Desconhecida";
}

export default function CardTarefas({
  titulo,
  descricao,
  atribuicao,
  conclusao,
  prioridade,
  status,
  fotoResponsavel,
  nomeResponsavel,
}) {
  const [expandido, setExpandido] = useState(false);
  const nivelPrioridade = definirNivelPrioridade(prioridade);
  const prioridadeData = prioridades.find((p) => p.nivel === nivelPrioridade);

  return (
    <div
      className={`${styles.cardTarefas} ${expandido ? styles.expandido : ""}`}
      onClick={() => setExpandido(!expandido)}
    >
      <div className={styles.responsavel}>
        <img
          src={
            fotoResponsavel
              ? fotoResponsavel
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  nomeResponsavel
                )}&background=C2C2C2&color=000000&rounded=true&size=128`
          }
          alt={nomeResponsavel}
        />
        <h4>{nomeResponsavel}</h4>
      </div>

      <div className={styles.detalhes}>
        <h4>{titulo}</h4>
        <div className={styles.descricao}>
          <p>{descricao}</p>
          <p>
            <strong>Data atribuição:</strong> {atribuicao}
          </p>
          <p>
            <strong>Data conclusão:</strong> {conclusao}
          </p>
        </div>
      </div>

      <div className={styles.tags}>
        <div className={styles.prioridade}>
          {prioridadeData?.svg}
          <p>{nivelPrioridade}</p>
        </div>
        <Button
          texto={status}
          variant={status === "Concluída" ? "primario" : "secundario"}
        />
      </div>
    </div>
  );
}
