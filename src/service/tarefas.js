import { apiSQL } from "./api";

export const tarefasPorGestor = async (tipoTarefa = "1", status = "4") => {
  const TOKEN_AUTH = localStorage.getItem("token");
  const ID_GESTOR = localStorage.getItem("usuarioId");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await apiSQL.get(
      `tarefa/selecionarFunctionGestor/${ID_GESTOR}`,
      {
        headers: { Authorization: `Bearer ${TOKEN_AUTH}` },
        params: { tipoTarefa, status },
      }
    );

    return { tarefas: response.data };
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    throw error;
  }
};

export const criarTarefa = async (
  titulo,
  descricao,
  gravidade,
  urgencia,
  tendencia,
  prazoTarefa,
  tempoEstimado,
  habilidades,
  idUsuario
) => {
  const TOKEN_AUTH = localStorage.getItem("token");
  const ID_GESTOR = localStorage.getItem("usuarioId");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  if (!ID_GESTOR) {
    console.warn("Nenhum id do gestor encontrado.");
    return [];
  }

  try {
    const response = await apiSQL.post(
      `tarefa/adicionar`,
      {
        nome: titulo,
        descricao: descricao,
        idUsuarioRelator: ID_GESTOR,
        gravidade: gravidade,
        urgencia: urgencia,
        tendencia: tendencia,
        dataPrazo: prazoTarefa ? new Date(new Date(prazoTarefa).setHours(new Date(prazoTarefa).getHours() - 3)).toISOString() : null,
        tempoEstimado: tempoEstimado || null,
        status: "PENDENTE",
        dataAtribuicao: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
        habilidades: habilidades,
        usuariosResponsaveis: idUsuario,
      },
      {
        headers: { Authorization: `Bearer ${TOKEN_AUTH}` }
      }
    );

    return { response };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};
