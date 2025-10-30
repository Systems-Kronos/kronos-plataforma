import styles from "./Membros.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Busca from "../../components/Busca";
import FormsAdicionarMembro from "../../components/FormsAdicionarMembro";
import CardInformacoes from "../../components/CardInformacoes";
import CardUsuarios from "../../components/CardUsuarios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { usuariosPorGestor } from "../../service/usuarios";
import { tarefasPorGestor } from "../../service/tarefas";
import { avisosDeHojePorGestor } from "../../service/avisos";

export default function Membros() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [membros, setMembros] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [tarefas, setTarefas] = useState([]);
  const [produtividade, setProdutividade] = useState(0);
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarMembros = async () => {
    try {
      const dados = await usuariosPorGestor();
      if (dados) {
        setMembros(dados.membros);
        setQuantidade(dados.quantidadeMembros);
      }
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    } finally {
      setLoading(false);
    }
  };

  const carregarTarefas = async () => {
    try {
      const dados = await tarefasPorGestor("1", "4");
      if (dados) {
        setTarefas(dados.tarefas);

        let tarefasTotais = dados.tarefas.length;
        let tarefasConcluidas = dados.tarefas.filter(
          (t) => t.status === "Concluída"
        ).length;

        setTarefasConcluidas(tarefasConcluidas);
        setProdutividade(
          tarefasTotais > 0
            ? Math.round((tarefasConcluidas / tarefasTotais) * 100)
            : 0
        );
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    } finally {
      setLoading(false);
    }
  };

  const carregarAvisos = async () => {
    try {
      const avisos = await avisosDeHojePorGestor();
      setAvisos(avisos || []);
    } catch (error) {
      console.error("Erro ao carregar avisos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMembros();
    carregarTarefas();
    carregarAvisos();
  }, []);

  const handleClosePopupAndRefresh = async () => {
    setShowPopup(false);
    await carregarAvisos();
    await carregarMembros();
    await carregarTarefas();
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.headerContainer}>
        <ArrowBackIosIcon
          style={{ color: "#E6B648", fontSize: 30, cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <h1>Gerenciar Equipes</h1>
      </div>

      <div className={styles.cardsContainer}>
        <CardInformacoes
          titulo={"Membros"}
          icone={
            <GroupsIcon
              style={{ color: "#E6B648", fontSize: 30, marginLeft: "-0.5vw" }}
            />
          }
          numero={loading ? "--" : quantidade || "00"}
        />
        <CardInformacoes
          titulo={"Tarefas Concluídas"}
          icone={<CheckCircleIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : tarefasConcluidas || "00"}
        />
        <CardInformacoes
          titulo={"Produtividade"}
          icone={<AutoGraphIcon style={{ color: "#E6B648" }} />}
          numero={loading ? "--" : produtividade + "%" || "00%"}
        />
      </div>

      <div className={styles.buscaContainer}>
        <Busca
          placeholder="Buscar por nome ou e-mail"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button
          texto={"Adicionar Membro"}
          onClick={() => setShowPopup(true)}
          variant={"primario"}
        />
      </div>

      <div className={styles.usersContainer}>
        {loading ? (
          <p>Carregando membros...</p>
        ) : membros && membros.length > 0 ? (
          membros
            .sort((a, b) => {
              const aTemAviso = avisos.some((aviso) => aviso.usuario === a.id)
                ? 1
                : 0;
              const bTemAviso = avisos.some((aviso) => aviso.usuario === b.id)
                ? 1
                : 0;

              if (aTemAviso > bTemAviso) return -1;
              if (aTemAviso < bTemAviso) return 1;

              return a.nome.localeCompare(b.nome);
            })
            .filter((membro) => {
              const termo = filtro.toLowerCase();
              return (
                membro.nome.toLowerCase().includes(termo) ||
                membro.email.toLowerCase().includes(termo)
              );
            })
            .map((membro) => {
              const concluidasMembro = tarefas.filter(
                (t) => t.idUsuario === membro.id && t.status === "Concluída"
              ).length;

              const avisosHoje = avisos.filter((a) => a.usuario === membro.id);

              return (
                <CardUsuarios
                  key={membro.id}
                  idUsuario={membro.id}
                  nomeUsuario={membro.nome}
                  fotoUsuario={membro.foto}
                  idCargo={membro.idCargo}
                  cargoUsuario={membro.nomeCargo}
                  idSetor={membro.idSetor}
                  setorUsuario={membro.nomeSetor}
                  emailUsuario={membro.email}
                  telefoneUsuario={membro.telefone}
                  statusUsuario={membro.ativo}
                  tarefasConcluidas={concluidasMembro}
                  possuiCargoGestoria={membro.booleanGestor}
                  avisoHoje={avisosHoje}
                />
              );
            })
        ) : (
          <p>Nenhum membro encontrado.</p>
        )}
      </div>

      {showPopup && (
        <FormsAdicionarMembro onClose={handleClosePopupAndRefresh} />
      )}
    </div>
  );
}
