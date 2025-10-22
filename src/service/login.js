import api from "./api";

export const login = async (cpf, senha) => {
  try {
    const response = await api.post(`usuario/loginPlataforma`, {
      cpf,
      senha,
    });

    const { token, usuarioId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("usuarioId", usuarioId);

    const respGestor = await api.get(`usuario/selecionarId/${usuarioId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const empresaId = respGestor.data.empresa?.id;
    if (empresaId) {
      localStorage.setItem("empresaId", empresaId);
    } else {
      console.warn("Usuário não possui empresa vinculada");
      localStorage.removeItem("empresaId");
    }

    return { ...response.data, empresaId };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("CPF não encontrado.");
    } else if (error.response?.status === 401) {
      throw new Error("Senha incorreta.");
    } else {
      throw new Error("Erro ao fazer login. Tente novamente mais tarde.");
    }
  }
};
