import "./style.css";
import { useNavigate } from "react-router-dom";
import Buscar from "../../components/Buscar";
import CardInformacoes from "../../components/CardInformacoes";
import CardTarefas from "../../components/CardTarefas";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export default function Tarefas() {
  const navigate = useNavigate();

  return (
    <div className="box-container">
      <div className="header-container">
        <ArrowBackIosIcon style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }} onClick={() => navigate("/")} />
        <h1>Gerenciar Tarefas</h1>
      </div>

      <div className="cards-container">
        <CardInformacoes titulo={"Tarefas Totais"} icone={<CircleOutlinedIcon style={{ color: "#E6B648" }}/>} descricao={"esse mês"} numero={"00"} />
        <CardInformacoes titulo={"Tarefas Concluídas"} icone={<CheckCircleIcon style={{ color: "#E6B648"}}/>} descricao={"esse mês"} numero={"00"} />
        <CardInformacoes titulo={"Tarefas Em Andamento"} icone={<WatchLaterIcon style={{ color: "#E6B648"}}/>} descricao={"esse mês"} numero={"00"} />
        <CardInformacoes titulo={"Tarefas Pendentes"} icone={<ErrorIcon style={{ color: "#E6B648"}}/>} descricao={"esse mês"} numero={"00"} />
      </div>

      <div className="busca-container">
        <Buscar />
      </div>

      <div className="tarefas-container">
        <div className="tarefas-pendentes-container">
          <div className="tarefas-container-header">
            <ErrorIcon style={{ color: "#848484ff", fontSize: 40 }}/>
            <h2>Pendentes</h2>
          </div>
          <div className="tarefas-pendentes-body">
            {/* TESTE --> FAZER LÓGICA PARA TRAZER OS USUÁRIOS NO BACK */}
            <CardTarefas
              titulo="Organizar reunião semanal"
              descricao="Definir agenda para a equipe de projetos, incluindo pauta de alinhamento, próximos passos, pendências e responsáveis. Garantir que todos os setores estejam representados e que os prazos sejam respeitados."
              setor="Gestão"
              vencimento="22/09/2025"
              prioridade="Baixa"
              status="Pendente"
              fotoResponsavel="https://i.pravatar.cc/150?img=14"
              nomeResponsavel="Diego Santos"
            />
            <CardTarefas
              titulo="Corrigir bug no login"
              descricao="Erro de autenticação ao usar credenciais inválidas. Além disso, validar casos de bloqueio após múltiplas tentativas e revisar a integração com o serviço de autenticação externo (OAuth)."
              setor="TI"
              vencimento="20/09/2025"
              prioridade="Muito Alta"
              status="Pendente"
              fotoResponsavel="https://i.pravatar.cc/150?img=11"
              nomeResponsavel="Alice Silva"
            />
          </div>
        </div>

        <div className="tarefas-andamento-container">
          <div className="tarefas-container-header">
            <WatchLaterIcon style={{ color: "#E6B648", fontSize: 40 }}/>
            <h2>Em Andamento</h2>
          </div>
          <div className="tarefas-andamento-body">
            {/* TESTE --> FAZER LÓGICA PARA TRAZER OS USUÁRIOS NO BACK */}
            <CardTarefas
              titulo="Testar novo ambiente de QA"
              descricao="Validar deploy automatizado e testes automáticos para novo ambiente de QA do nosso site."
              setor="Qualidade"
              vencimento="23/09/2025"
              prioridade="Muito Baixa"
              status="Em andamento"
              fotoResponsavel="https://i.pravatar.cc/150?img=15"
              nomeResponsavel="Eduarda Martins"
            />
            <CardTarefas
              titulo="Atualizar documentação"
              descricao="Revisar o guia de integração com a API, atualizar novos métodos e models de tabelas do banco."
              setor="Suporte"
              vencimento="21/09/2025"
              prioridade="Alta"
              status="Em andamento"
              fotoResponsavel="https://i.pravatar.cc/150?img=12"
              nomeResponsavel="Bruno Souza"
            />
          </div>
        </div>

        <div className="tarefas-concluidas-container">
          <div className="tarefas-container-header">
            <CheckCircleIcon style={{ color: "#08c105ff", fontSize: 40 }}/>
            <h2>Concluídas</h2>
          </div>
          <div className="tarefas-concluidas-body">
            {/* TESTE --> FAZER LÓGICA PARA TRAZER OS USUÁRIOS NO BACK */}
            <CardTarefas
              titulo="Refatorar código legado"
              descricao="Melhorar performance do código para poder refletir as novas tecnologias do mercado tecnologico atual."
              setor="Desenvolvimento"
              vencimento="25/09/2025"
              prioridade="Moderada"
              status="Concluído"
              fotoResponsavel="https://i.pravatar.cc/150?img=13"
              nomeResponsavel="Carla Oliveira"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
