import styles from "./Membros.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Buscar from "../../components/Buscar";
import FormsAdicionarMembro from "../../components/FormsAdicionarMembro";
import CardInformacoes from "../../components/CardInformacoes";
import CardUsuarios from "../../components/CardUsuarios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { membrosPorGestor } from "../../service/membros";

export default function Membros() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [membros, setMembros] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarMembros = async () => {
      try {
        const dados = await membrosPorGestor();
        if (dados) {
          setMembros(dados.membros);
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
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <h1>Gerenciar Equipes</h1>
      </div>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Membros"}
          icone={<GroupsIcon style={{ color: "#E6B648", fontSize: 30, marginLeft: "-0.5vw" }} />}
          descricao={"x membros nesse mês"}
          numero={loading ? "--" : quantidade || "00"}
        />
        <CardInformacoes
          titulo={"Tarefas Concluídas"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          descricao={"x concluídas hoje"}
          numero={"00"}
        />
        <CardInformacoes
          titulo={"Produtividade"}
          icone={<AutoGraphIcon style={{ color: "#E6B648" }} />}
          descricao={"x% vs mês anterior"}
          numero={"00"}
        />
      </div>

      <div className={styles.buscaAdicionarContainer}>
        <Buscar />
        <Button
          texto={"Adicionar Membro"}
          onClick={() => setShowPopup(true)}
          variant={"primario"}
        />
      </div>

      <div className={styles.usersContainer}>
        {/* TESTE --> FAZER LÓGICA PARA TRAZER OS USUÁRIOS NO BACK */}
        <CardUsuarios
          nomeUsuario="Alice Silva"
          fotoUsuario="https://i.pravatar.cc/150?img=1"
          cargo="Desenvolvedora Front-end"
          emailUsuario="alice.silva@email.com"
          telefoneUsuario="(11) 91234-5678"
          setorUsuario="TI"
          statusUsuario="Ativo"
          tarefasConcluidas={12}
          desempenho="Excelente"
          justificativaHoje={true}
        />
        <CardUsuarios
          nomeUsuario="Bruno Souza"
          fotoUsuario="https://i.pravatar.cc/150?img=2"
          cargo="Analista de Sistemas"
          emailUsuario="bruno.souza@email.com"
          telefoneUsuario="(21) 99876-5432"
          setorUsuario="TI"
          statusUsuario="Ativo"
          tarefasConcluidas={8}
          desempenho="Bom"
          justificativaHoje={false}
        />
        <CardUsuarios
          nomeUsuario="Carla Oliveira"
          fotoUsuario="https://i.pravatar.cc/150?img=3"
          cargo="Gerente de Projetos"
          emailUsuario="carla.oliveira@email.com"
          telefoneUsuario="(31) 98765-4321"
          setorUsuario="Gestão"
          statusUsuario="Ausente"
          tarefasConcluidas={5}
          desempenho="Regular"
          justificativaHoje={true}
        />
        <CardUsuarios
          nomeUsuario="Diego Santos"
          fotoUsuario="https://i.pravatar.cc/150?img=4"
          cargo="QA Tester"
          emailUsuario="diego.santos@email.com"
          telefoneUsuario="(41) 91234-5678"
          setorUsuario="TI"
          statusUsuario="Ativo"
          tarefasConcluidas={10}
          desempenho="Excelente"
          justificativaHoje={false}
        />
      </div>

      {showPopup && (
        <FormsAdicionarMembro onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
