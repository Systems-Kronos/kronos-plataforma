import axios from "axios";

const API_URL = "https://spring-api-sql.onrender.com/api/usuario";
const TOKEN_AUTH = localStorage.getItem("token");
const ID_GESTOR = localStorage.getItem("usuarioId");
const ID_EMPRESA = localStorage.getItem("empresaId");

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

    const response = await axios.put(
      `${API_URL}/atualizar/${idUsuario}`,
      body,
      { headers: { Authorization: `Bearer ${TOKEN_AUTH}` } }
    );

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

    const response = await axios.post(
      `${API_URL}/adicionar`,
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
        // senha: senhaHashed,
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
