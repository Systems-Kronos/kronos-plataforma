import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/setor";

export const setoresPorEmpresa = async () => {
  const TOKEN_AUTH = localStorage.getItem("token");
  const ID_EMPRESA = localStorage.getItem("empresaId");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  if (!ID_EMPRESA) {
    console.warn("Nenhuma empresa vinculada encontrada.");
    return [];
  }

  try {
    const respSetores = await axios.get(
      `${API_URL}/selecionar/empresa/${ID_EMPRESA}`,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

    return respSetores.data;
  } catch (error) {
    console.error("Erro ao carregar setores:", error);
    throw error;
  }
};
