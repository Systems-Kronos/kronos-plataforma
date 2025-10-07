import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import CardInformacoes from "../../components/CardInformacoes";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { membrosPorGestor } from "../../service/membros";
import { tarefasPorGestor } from "../../service/tarefas";
import { reportsPorGestor } from "../../service/reports";

export default function Home() {
  const [quantidadeMembros, setQuantidadeMembros] = useState(0);
  const [reportsPendentes, setReportsPendentes] = useState(0);
  const [tarefasAtivas, setTarefasAtivas] = useState(0);
  const [produtividade, setProdutividade] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarMembros = async () => {
      try {
        const dados = await membrosPorGestor();
        if (dados) {
          setQuantidadeMembros(dados.quantidadeMembros);
        }
      } catch (err) {
        console.error("Erro ao buscar membros", err);
      } finally {
        setLoading(false);
      }
    };

    carregarMembros();
  }, []);

  useEffect(() => {
    const carregarReports = async () => {
      try {
        const dados = await reportsPorGestor();
        if (dados) {
          setReportsPendentes(dados.pendentes);
        }
      } catch (err) {
        console.error("Erro ao buscar reports", err);
      } finally {
        setLoading(false);
      }
    };

    carregarReports();
  }, []);

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const dados = await tarefasPorGestor("1", "4");
        if (dados) {
          let tarefasTotais = dados.tarefas.length;
          let tarefasConcluidas = dados.tarefas.filter(t => t.status === "Concluída").length;

          setTarefasAtivas(dados.tarefas.filter(t => t.status === "Em Andamento").length);
          setProdutividade(tarefasTotais > 0 ? Math.round((tarefasConcluidas / tarefasTotais) * 100) : 0);
        }
      } catch (err) {
        console.error("Erro ao calcular produtividade", err);
      } finally {
        setLoading(false);
      }
    };

    carregarTarefas();
  }, []);

  return (
    <div className={styles.boxContainer}>
      <h1>Dashboard do Gestor</h1>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Membros"}
          icone={<GroupsIcon style={{ color: "#E6B648", fontSize: 30, marginLeft: "-0.5vw" }} />}
          numero={loading ? "--" : quantidadeMembros || "00"}
        />
        <CardInformacoes
          titulo={"Tarefas Ativas"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasAtivas || "00"}
        />
        <CardInformacoes
          titulo={"Reports Pendentes"}
          icone={<ErrorIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : reportsPendentes || "00"}
        />
        <CardInformacoes
          titulo={"Produtividade"}
          icone={<AutoGraphIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : produtividade+"%" || "00%"}
        />
      </div>
    </div>
  );
}
