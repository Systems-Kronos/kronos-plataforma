import { apiSQL } from "./api";

export const usuariosPorGestor = async () => {
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
    const response = await apiSQL.get(`usuario/selecionarFunction/${ID_GESTOR}`, {
      headers: { Authorization: `Bearer ${TOKEN_AUTH}` },
    });
    const quantidadeMembros = response.data.length;

    return { membros: response.data, quantidadeMembros };
  } catch (error) {
    console.error("Erro ao carregar membros:", error);
    throw error;
  }
};

export const atualizarUsuario = async ({
  idUsuario,
  nome,
  email,
  telefone,
  setor,
  cargo,
  booleanGestor,
  ativo,
}) => {
  try {
    const TOKEN_AUTH = localStorage.getItem("token");

    if (!TOKEN_AUTH) {
      console.warn("Sem token, não chamando a API.");
      return null;
    }

    const body = {};
    if (nome) body.nome = nome;
    if (email) body.email = email;
    if (telefone) body.telefone = telefone;
    if (booleanGestor !== undefined) body.booleanGestor = booleanGestor;
    if (ativo !== undefined) body.ativo = ativo;
    if (setor) body.setor = { id: Number(setor) };
    if (cargo) body.cargo = { id: Number(cargo) };
    console.log(body);

    const response = await apiSQL.put(`usuario/atualizar/${idUsuario}`, body, {
      headers: { Authorization: `Bearer ${TOKEN_AUTH}` },
    });

    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error;
  }
};

export const adicionarUsuario = async ({
  nome,
  booleanGestor,
  setorId,
  cargoId,
  cpf,
  telefone,
  email,
}) => {
  try {
    const TOKEN_AUTH = localStorage.getItem("token");
    const ID_GESTOR = localStorage.getItem("usuarioId");
    const ID_EMPRESA = localStorage.getItem("empresaId");

    if (!TOKEN_AUTH) {
      console.warn("Sem token, não chamando a API.");
      return null;
    }

    if (!ID_GESTOR) {
      console.warn("Nenhum id do gestor encontrado.");
      return [];
    }

    if (!ID_EMPRESA) {
      console.warn("Nenhuma empresa vinculada encontrada.");
      return [];
    }

    const response = await apiSQL.post(
      `usuario/adicionar`,
      {
        id: 0,
        nome: nome,
        gestorId: Number(ID_GESTOR),
        booleanGestor: booleanGestor,
        empresaId: Number(ID_EMPRESA),
        setorId: setorId,
        cargoId: cargoId,
        cpf: cpf,
        telefone: telefone,
        email: email,
        senha: "senha123",
        foto: null,
        ativo: true,
      },
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    throw error;
  }
};
