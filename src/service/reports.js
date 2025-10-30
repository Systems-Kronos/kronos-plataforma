import { apiSQL } from "./api";

export const reportsPorGestor = async () => {
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
    const response = await apiSQL.get(
      `report/selecionarFunction/${ID_GESTOR}`,
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

export const atualizarStatusReport = async (idReport, status) => {
  const TOKEN_AUTH = localStorage.getItem("token");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await apiSQL.put(
      `report/atualizarStatus/${idReport}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${TOKEN_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar reports:", error);
    throw error;
  }
};
