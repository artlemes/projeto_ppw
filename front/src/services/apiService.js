// Configuração da URL base da API
//const API_BASE_URL = "http://127.0.0.1:8080/api";
const API_BASE_URL = "https://bk-ti1x.onrender.com"; //"https://bk-ti1x.onrender.com";

/*
 * Função para cadastrar um usuário.
 * @param {Object} userData - Dados do usuário a serem cadastrados.
 * @returns {Promise<Response>} Resposta da API.
 */
export const cadastrarUsuario = async (userData) => {
  //return fetch(`${API_BASE_URL}/cadastro`, { rota que tava usando antes, não sei certo qual endpoint usar, mas antes com esse aqui tava danto undefined
  return fetch(`${API_BASE_URL}/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

/*
 * Função para realizar login.
 * @param {Object} userData - Dados do usuário para login.
 * @returns {Promise<Response>} Resposta da API.
 */
export const fazerLogin = async (userData) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
