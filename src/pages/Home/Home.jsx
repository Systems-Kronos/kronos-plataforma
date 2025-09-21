import "./style.css";
import CardInformacoes from "../../components/CardInformacoes";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

export default function Home() {
  return (
    <div className="box-container">
      <h1>Dashboard do Gestor</h1>

      <div className="cards-container">
        <CardInformacoes
          titulo={"Membros"}
          icone={
            <GroupsIcon
              style={{ color: "#E6B648", fontSize: 30, marginLeft: "-0.5vw" }}
            />
          }
          descricao={"x membros nesse mês"}
          numero={"00"}
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
