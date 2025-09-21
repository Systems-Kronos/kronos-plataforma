import "./style.css";
import { useNavigate } from "react-router-dom";
import Buscar from "../../components/Buscar";
import CardInformacoes from "../../components/CardInformacoes";
import CardReports from "../../components/CardReports";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="box-container">
      <div className="header-container">
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h1>Gerenciar Reports</h1>
      </div>

      <div className="cards-container">
        <CardInformacoes
          titulo={"Reports Totais"}
          icone={<CircleOutlinedIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={"00"}
        />
        <CardInformacoes
          titulo={"Concluídos"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={"00"}
        />
        <CardInformacoes
          titulo={"Pendentes"}
          icone={<ErrorIcon style={{ color: "#E6B648" }} />}
          descricao={"esse mês"}
          numero={"00"}
        />
      </div>

      <div className="busca-container">
        <Buscar />
      </div>

      <div className="reports-container">
        {/* TESTE --> FAZER LÓGICA PARA TRAZER OS USUÁRIOS NO BACK */}
        <CardReports
          titulo="Relatório de Vendas"
          descricao="Resumo das vendas realizadas no último mês."
          data="15/09/2025"
          nomeResponsavel="Alice Silva"
          fotoResponsavel="https://i.pravatar.cc/150?img=5"
        />
        <CardReports
          titulo="Relatório de Suporte"
          descricao="Chamados técnicos resolvidos e em andamento."
          data="16/09/2025"
          nomeResponsavel="Bruno Souza"
          fotoResponsavel="https://i.pravatar.cc/150?img=6"
        />
        <CardReports
          titulo="Relatório de Projetos"
          descricao="Status das entregas e atividades pendentes."
          data="17/09/2025"
          nomeResponsavel="Carla Oliveira"
          fotoResponsavel="https://i.pravatar.cc/150?img=7"
        />
      </div>
    </div>
  );
}
