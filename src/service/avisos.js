import { apiNoSQL } from "./api";

export const avisosPorGestor = async () => {
  const ID_GESTOR = localStorage.getItem("usuarioId");

  if (!ID_GESTOR) {
    console.warn("Nenhum id do gestor encontrado.");
    return [];
  }

  try {
    const response = await apiNoSQL.get(
      `calendario/selecionarObservacoesGestor/${ID_GESTOR}`
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

export const atualizarStatusAviso = async (id) => {
  try {
    const response = await apiNoSQL.put(
      `calendario/atualizarStatus/${id}`,
      { "aceito": true }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualiza status de aviso:", error);
    throw error;
  }
};
