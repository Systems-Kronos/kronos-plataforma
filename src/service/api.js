import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spring-api-sql.onrender.com/api/',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    
    if (status === 401 || status === 403) {
      console.warn("Token expirado ou inválido. Redirecionando para login.");
      
      localStorage.removeItem("token");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("empresaId");
      
      window.location.href = '/'; 
    }
    
    return Promise.reject(error);
  }
);

export default api;
