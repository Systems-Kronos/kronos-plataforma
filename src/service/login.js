import { apiSQL } from "./api";

export const login = async (cpf, senha) => {
  try {
    const response = await apiSQL.post(`usuario/loginPlataforma`, {
      cpf,
      senha,
    });

    const { token, usuarioId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("usuarioId", usuarioId);

    const respGestor = await apiSQL.get(`usuario/selecionarId/${usuarioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const empresaId = respGestor.data.empresa?.id;
    if (empresaId) {
      localStorage.setItem("empresaId", empresaId);
    } else {
      console.warn("Usuário não possui empresa vinculada");
      localStorage.removeItem("empresaId");
    }

    return { ...response.data, empresaId };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
