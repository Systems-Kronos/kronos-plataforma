import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/usuario";

export const membrosPorGestor = async () => {
  const TOKEN_AUTH = localStorage.getItem("token");
  const ID_GESTOR = localStorage.getItem("usuarioId");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await axios.get(
      `${API_URL}/selecionarFunction/${ID_GESTOR}`,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );
    const quantidadeMembros = response.data.length;

    return { membros: response.data, quantidadeMembros };
  } catch (error) {
    console.error("Erro ao carregar membros:", error);
    throw error;
  }
};
