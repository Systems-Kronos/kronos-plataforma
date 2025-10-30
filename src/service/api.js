import axios from 'axios';

export const apiSQL = axios.create({
  baseURL: 'https://spring-api-sql.onrender.com/api/',
});

export const apiNoSQL = axios.create({
  baseURL: 'https://spring-api-nosql.onrender.com/api/',
});

export const rpaNoticias = axios.create({
  baseURL: 'https://kronos-rpa.onrender.com/',
});

const handleAuthError = (error) => {
  const status = error.response ? error.response.status : null;

  if (status === 401 || status === 403) {
    console.warn("Token expirado ou inválido. Redirecionando para login.");

    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("empresaId");

    window.location.href = "/";
  }

  return Promise.reject(error);
};

apiSQL.interceptors.response.use((response) => response, handleAuthError);
apiNoSQL.interceptors.response.use((response) => response, handleAuthError);
rpaNoticias.interceptors.response.use((response) => response, handleAuthError);
