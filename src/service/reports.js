import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/report";

export const reportsPorGestor = async () => {
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
    const total = response.data.length;
    let concluidos = 0;
    let pendentes = 0;

    for (const report of response.data) {
      if (report.status === "Concluído") {
        concluidos++;
      } else {
        pendentes++;
      }
    }

    return { reports: response.data, total, concluidos, pendentes };
  } catch (error) {
    console.error("Erro ao carregar reports:", error);
    throw error;
  }
};
