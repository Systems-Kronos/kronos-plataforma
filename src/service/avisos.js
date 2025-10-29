import { apiNoSQL } from "./api";

export const avisosPorGestor = async () => {
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
    const response = await apiNoSQL.get(
      `calendario/selecionarObservacoesGestor/${ID_GESTOR}`,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar avisos:", error);
    throw error;
  }
};

export const avisosDeHojePorGestor = async () => {
  try {
    const avisos = await avisosPorGestor();
    if (!avisos || !Array.isArray(avisos)) return [];

    const diaAtual = new Date().toISOString().split("T")[0];

    const avisosHoje = avisos.filter((a) => {
      const dataAviso = a.dia ? a.dia.split("T")[0] : null;
      const pendente = a.aceito === false || a.aceito === null;
      return dataAviso === diaAtual && pendente;
    });

    return avisosHoje;
  } catch (error) {
    console.error("Erro ao buscar avisos de hoje:", error);
    return [];
  }
};

