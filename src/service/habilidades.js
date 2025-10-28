import { apiSQL } from "./api";

export const habilidadesPorEmpresa = async () => {
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
    const response = await apiSQL.get(
      `habilidade/selecionar/empresa/${ID_EMPRESA}`,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar habilidades:", error);
    throw error;
  }
};

export const adicionarHabilidadeUsuarios = async (idUsuario, idsHabilidade) => {
  const TOKEN_AUTH = localStorage.getItem("token");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não é possível adicionar a habilidade.");
    return null;
  }

  try {
    const response = await apiSQL.post(
      `habilidade-usuario/adicionar`,
      {
        idUsuario: idUsuario,
        idsHabilidade: idsHabilidade,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN_AUTH}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar habilidades ao usuário:", error);
    throw error;
  }
};

export const habilidadesPorUsuario = async (idUsuario) => {
  const TOKEN_AUTH = localStorage.getItem("token");

  if (!TOKEN_AUTH) {
    console.warn("Sem token, não chamando a API.");
    return null;
  }

  try {
    const response = await apiSQL.get(
      `habilidade-usuario/selecionar/${idUsuario}`,
      {
        headers: { Authorization: `Bearer ${TOKEN_AUTH}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar habilidades do usuário:", error);
    throw error;
  }
};
