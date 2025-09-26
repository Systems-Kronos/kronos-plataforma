import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/usuario";

export const login = async (cpf, senha) => {
  try {
    const response = await axios.post(`${API_URL}/loginPlataforma`, {
      cpf,
      senha,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
