import "./style.css";
import { useState } from "react";
import Button from "../Button";

const prioridades = [
    {
        nivel: "Muito Alta",
        svg: (
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21L11 11.7011L1.5 21L0 19L11 7.5L22 19L20 21Z" fill="#FF0004"/>
                <path d="M20 13.5L11 4.20108L1.5 13.5L0 11.5L11 0L22 11.5L20 13.5Z" fill="#FF0004"/>
            </svg>
        )
    },
    {
        nivel: "Alta",
        svg: (
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 13.5L11 4.20108L1.5 13.5L0 11.5L11 0L22 11.5L20 13.5Z" fill="#ED6700"/>
            </svg>
        )
    },
    {
        nivel: "Moderada",
        svg: (
            <svg width="19" height="4" viewBox="0 0 19 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 2L19 2" stroke="#FFC412" stroke-width="3"/>
            </svg>
        )
    },
    {
        nivel: "Baixa",
        svg: (
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0L11 9.29892L20.5 0L22 2L11 13.5L0 2L2 0Z" fill="#70E648"/>
            </svg>
        )
    },
    {
        nivel: "Muito Baixa",
        svg: (
            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7.5L11 16.7989L20.5 7.5L22 9.5L11 21L0 9.5L2 7.5Z" fill="#48B9E6"/>
                <path d="M2 0L11 9.29892L20.5 0L22 2L11 13.5L0 2L2 0Z" fill="#48B9E6"/>
            </svg>
        )
    },
]

export function CardTarefas({ titulo, descricao, setor, vencimento, prioridade, status, fotoResponsavel, nomeResponsavel }) {
    const [expandido, setExpandido] = useState(false);
    const prioridadeData = prioridades.find(p => p.nivel === prioridade);

    return (
        <div className={`card-tarefas ${expandido ? "expandido" : ""}`} onClick={() => setExpandido(!expandido)}>
            <div className="responsavel">
                <img src={fotoResponsavel} alt="fotoResponsavel" />
                <h4>{nomeResponsavel}</h4>
            </div>

            <div className="detalhes">
                <h4>{titulo}</h4>
                <div className="descricao">
                    <p>{descricao}</p>
                    <p><strong>Setor:</strong> {setor}</p>
                    <p><strong>Vencimento:</strong> {vencimento}</p>
                </div>
            </div>

            <div className="tags">
                <div className="prioridade">
                    {prioridadeData?.svg}
                    <p>{prioridadeData?.nivel ?? prioridade}</p>
                </div>
                <Button texto={status} variant={status === "Concluído" ? "primario" : "secundario"}/>
            </div>
        </div>
    );
}