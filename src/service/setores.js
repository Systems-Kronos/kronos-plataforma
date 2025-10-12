import api from "./api";

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
    const respSetores = await api.get(
      `setor/selecionar/empresa/${ID_EMPRESA}`,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

    return respSetores.data;
  } catch (error) {
    console.error("Erro ao carregar setores:", error);
    throw error;
  }
};
