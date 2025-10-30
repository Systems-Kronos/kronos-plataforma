import styles from "./Tarefas.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Buscar from "../../components/Buscar";
import CardInformacoes from "../../components/CardInformacoes";
import CardTarefas from "../../components/CardTarefas";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { tarefasPorGestor } from "../../service/tarefas";

export default function Tarefas() {
  const navigate = useNavigate();
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);
  const [tarefasPendentes, setTarefasPendentes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [tarefasEmAndamento, setTarefasEmAndamento] = useState([]);
  const [tarefasCanceladas, setTarefasCanceladas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const dados = await tarefasPorGestor("1", "4");
        if (dados) {
          setTarefasConcluidas(
            dados.tarefas.filter((t) => t.status === "Concluída")
          );
          setTarefasPendentes(
            dados.tarefas.filter((t) => t.status === "Pendente")
          );
          setTarefasEmAndamento(
            dados.tarefas.filter((t) => t.status === "Em Andamento")
          );
          setTarefasCanceladas(
            dados.tarefas.filter((t) => t.status === "Cancelada")
          );
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
      } finally {
        setLoading(false);
      }
    };

    carregarTarefas();
  }, []);

  return (
    <div className={styles.boxContainer}>
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <h1>Gerenciar Tarefas</h1>
      </div>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Concluídas"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasConcluidas.length || "00"}
        />
        <CardInformacoes
          titulo={"Em Andamento"}
          icone={<WatchLaterIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasEmAndamento.length || "00"}
        />
        <CardInformacoes
          titulo={"Pendentes"}
          icone={<ErrorIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasPendentes.length || "00"}
        />
        <CardInformacoes
          titulo={"Canceladas"}
          icone={<NotInterestedIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasCanceladas.length || "00"}
        />
      </div>

      <div className={styles.buscaContainer}>
        <Buscar
          placeholder="Buscar por nome do responsável ou título"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className={styles.tarefasContainer}>
        <div className={styles.tarefasPendentesContainer}>
          <div className={styles.tarefasContainerHeader}>
            <ErrorIcon style={{ color: "#848484ff", fontSize: 40 }} />
            <h2>Pendentes</h2>
          </div>
          <div className={styles.tarefasPendentesBody}>
            {loading ? (
              <p>Carregando Tarefas...</p>
            ) : tarefasPendentes && tarefasPendentes.length > 0 ? (
              tarefasPendentes
                .slice()
                .sort((a, b) => b.id - a.id)
                .filter((tarefa) => {
                  const termo = filtro.toLowerCase();
                  if (!termo) return true;

                  return (
                    tarefa.titulo?.toLowerCase().includes(termo) ||
                    tarefa.nomeResponsavel?.toLowerCase().includes(termo)
                  );
                })
                .map((tarefaPendente) => (
                  <CardTarefas
                    key={tarefaPendente.id}
                    titulo={tarefaPendente.titulo}
                    descricao={tarefaPendente.descricao}
                    atribuicao={
                      tarefaPendente.dataAtribuicao
                        ? tarefaPendente.dataAtribuicao
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")
                        : ""
                    }
                    conclusao={
                      tarefaPendente.dataConclusao
                        ? tarefaPendente.dataConclusao.split("T")[0]
                        : "Pendente"
                    }
                    prioridade={
                      (Number(tarefaPendente.gravidade) || 1) *
                      (Number(tarefaPendente.urgencia) || 1) *
                      (Number(tarefaPendente.tendencia) || 1)
                    }
                    status={tarefaPendente.status}
                    fotoResponsavel={tarefaPendente.fotoUsuario}
                    nomeResponsavel={tarefaPendente.nomeUsuario}
                  />
                ))
            ) : (
              <p>Nenhuma Tarefa encontrada.</p>
            )}
          </div>
        </div>

        <div className={styles.tarefasAndamentoContainer}>
          <div className={styles.tarefasContainerHeader}>
            <WatchLaterIcon style={{ color: "#E6B648", fontSize: 40 }} />
            <h2>Em Andamento</h2>
          </div>
          <div className={styles.tarefasAndamentoBody}>
            {loading ? (
              <p>Carregando Tarefas...</p>
            ) : tarefasEmAndamento && tarefasEmAndamento.length > 0 ? (
              tarefasEmAndamento
                .slice()
                .sort((a, b) => b.id - a.id)
                .filter((tarefa) => {
                  if (!tarefa) return false;
                  const termo = (filtro || "").toLowerCase();
                  if (!termo) return true;

                  return (
                    tarefa.titulo?.toLowerCase().includes(termo) ||
                    tarefa.nomeResponsavel?.toLowerCase().includes(termo)
                  );
                })
                .map((tarefaEmAndamento) => (
                  <CardTarefas
                    key={tarefaEmAndamento.id}
                    titulo={tarefaEmAndamento.titulo}
                    descricao={tarefaEmAndamento.descricao}
                    atribuicao={
                      tarefaEmAndamento.dataAtribuicao
                        ? tarefaEmAndamento.dataAtribuicao
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")
                        : ""
                    }
                    conclusao={
                      tarefaEmAndamento.dataConclusao
                        ? tarefaEmAndamento.dataConclusao.split("T")[0]
                        : "Em Andamento"
                    }
                    prioridade={
                      (Number(tarefaEmAndamento.gravidade) || 1) *
                      (Number(tarefaEmAndamento.urgencia) || 1) *
                      (Number(tarefaEmAndamento.tendencia) || 1)
                    }
                    status={tarefaEmAndamento.status}
                    fotoResponsavel={tarefaEmAndamento.fotoUsuario}
                    nomeResponsavel={tarefaEmAndamento.nomeUsuario}
                  />
                ))
            ) : (
              <p>Nenhuma Tarefa encontrada.</p>
            )}
          </div>
        </div>

        <div className={styles.tarefasConcluidasContainer}>
          <div className={styles.tarefasContainerHeader}>
            <CheckCircleIcon style={{ color: "#08c105ff", fontSize: 40 }} />
            <h2>Concluídas</h2>
          </div>
          <div className={styles.tarefasConcluidasBody}>
            {loading ? (
              <p>Carregando Tarefas...</p>
            ) : tarefasConcluidas && tarefasConcluidas.length > 0 ? (
              tarefasConcluidas
                .slice()
                .sort((a, b) => b.id - a.id)
                .filter((tarefa) => {
                  if (!tarefa) return false;
                  const termo = (filtro || "").toLowerCase();
                  if (!termo) return true;

                  return (
                    tarefa.titulo?.toLowerCase().includes(termo) ||
                    tarefa.nomeResponsavel?.toLowerCase().includes(termo)
                  );
                })
                .map((tarefaConcluida) => (
                  <CardTarefas
                    key={tarefaConcluida.id}
                    titulo={tarefaConcluida.titulo}
                    descricao={tarefaConcluida.descricao}
                    atribuicao={
                      tarefaConcluida.dataAtribuicao
                        ? tarefaConcluida.dataAtribuicao
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")
                        : ""
                    }
                    conclusao={
                      tarefaConcluida.dataConclusao
                        ? tarefaConcluida.dataConclusao
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")
                        : "Concluida"
                    }
                    prioridade={
                      (Number(tarefaConcluida.gravidade) || 1) *
                      (Number(tarefaConcluida.urgencia) || 1) *
                      (Number(tarefaConcluida.tendencia) || 1)
                    }
                    status={tarefaConcluida.status}
                    fotoResponsavel={tarefaConcluida.fotoUsuario}
                    nomeResponsavel={tarefaConcluida.nomeUsuario}
                  />
                ))
            ) : (
              <p>Nenhuma Tarefa encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
