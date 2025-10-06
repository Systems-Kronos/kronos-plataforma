import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/tarefa";

export const tarefasPorGestor = async (tipoTarefa = "1", status = "4") => {
  const TOKEN_AUTH = localStorage.getItem("token");
  const ID_GESTOR = localStorage.getItem("usuarioId");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await axios.get(
      `${API_URL}/selecionarFunctionGestor/${ID_GESTOR}`,
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
