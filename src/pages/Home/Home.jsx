import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import CardInformacoes from "../../components/CardInformacoes";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { membrosPorGestor } from "../../service/membros";

export default function Home() {
    const [quantidade, setQuantidade] = useState(0);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const carregarMembros = async () => {
        try {
          const dados = await membrosPorGestor();
          if (dados) {
            setQuantidade(dados.quantidadeMembros);
          }
        } catch (err) {
          console.error("Erro ao buscar membros", err);
        } finally {
          setLoading(false);
        }
      };
  
      carregarMembros();
    }, []);

  return (
    <div className={styles.boxContainer}>
      <h1>Dashboard do Gestor</h1>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Membros"}
          icone={
            <GroupsIcon
              style={{ color: "#E6B648", fontSize: 30, marginLeft: "-0.5vw" }}
            />
          }
          descricao={"x membros nesse mês"}
          numero={loading ? "--" : quantidade || "00"}
        />
        <CardInformacoes
          titulo={"Tarefas Ativas"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          descricao={"x concluídas hoje"}
          numero={"00"}
        />
        <CardInformacoes
          titulo={"Reports Pendentes"}
          icone={<ErrorIcon style={{ color: "#E6B648" }} />}
          descricao={"x adicionado hoje"}
          numero={"00"}
        />
        <CardInformacoes
          titulo={"Produtividade"}
          icone={<AutoGraphIcon style={{ color: "#E6B648" }} />}
          descricao={"x% vs mês anterior"}
          numero={"00"}
        />
      </div>
    </div>
  );
}
