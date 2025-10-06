import styles from "./Reports.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Buscar from "../../components/Buscar";
import CardInformacoes from "../../components/CardInformacoes";
import CardReports from "../../components/CardReports";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { reportsPorGestor } from "../../service/reports";

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [reportsConcluidos, setReportsConcluidos] = useState(0);
  const [reportsPendentes, setReportsPendentes] = useState(0);
  const [loading, setLoading] = useState(true);

  async function handleAtualizacao() {
    try {
      const dados = await reportsPorGestor();
      if (dados) {
        setReports(dados.reports);
        setTotalReports(dados.total);
        setReportsConcluidos(dados.concluidos);
        setReportsPendentes(dados.pendentes);
      }
    } catch (err) {
      console.error("Erro ao atualizar dados após conclusão:", err);
    }
  }

  useEffect(() => {
    const carregarReports = async () => {
      try {
        const dados = await reportsPorGestor();
        if (dados) {
          setReports(dados.reports);
          setTotalReports(dados.total);
          setReportsConcluidos(dados.concluidos);
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

  return (
    <div className={styles.boxContainer}>
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h1>Gerenciar Reports</h1>
      </div>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Reports Totais"}
          icone={<CircleOutlinedIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={loading ? "--" : totalReports || "00"}
        />
        <CardInformacoes
          titulo={"Concluídos"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={loading ? "--" : reportsConcluidos || "00"}
        />
        <CardInformacoes
          titulo={"Pendentes"}
          icone={<ErrorIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={loading ? "--" : reportsPendentes || "00"}
        />
      </div>

      <div className={styles.buscaContainer}>
        <Buscar />
      </div>

      <div className={styles.reportsContainer}>
        {loading ? (
          <p>Carregando reports...</p>
        ) : reports && reports.length > 0 ? (
          reports.map((report) => (
            <CardReports
              key={report.id}
              idReport={report.id}
              titulo={report.problema}
              descricao={report.descricao}
              tituloTarefa={report.tituloTarefa}
              nomeResponsavel={report.nomeUsuario}
              fotoResponsavel={report.fotoUsuario}
              status={report.status}
              onAtualizar={handleAtualizacao}
            />
          ))
        ) : (
          <p>Nenhum report encontrado.</p>
        )}
      </div>
    </div>
  );
}
