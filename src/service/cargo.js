import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/cargo";

export const listarCargos = async () => {
  const TOKEN_AUTH = localStorage.getItem("token");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/listar`, {
      headers: { Authorization: `Bearer ${TOKEN_AUTH}` },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar cargos:", error);
    throw error;
  }
};
