import { rpaNoticias } from "./api";

export const noticiasRpa = async () => {
  try {
    const response = await rpaNoticias.get(
      `noticias`,
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    throw error;
  }
};
