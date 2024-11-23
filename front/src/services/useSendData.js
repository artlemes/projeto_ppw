/*
Sugestão de uso no projeto galera:
import useSendData from '../../Hooks/useSendData';

const MeuComponenteTeste = ({ meusParametros }) => {
    const { sendData, loading, error, data } = useSendData();
    // sendData('endpoint', formData, 'POST'); é a função para o envio dos dados
        // 'endpoint' é a rota final do backend
        // formData é o objeto com os dados a serem enviados
        // 'POST' ou 'GET' dependendo da requisição

    const handleLogin = () => {
        const formData = new FormData(); // Instanciação de um objeto FormData para agrupar os dados
        formData.append('action', 'login'); // Essas 3 linhas são os campos do formulário "html" a serem enviados
        formData.append('email', email); // Essas 3 linhas são os campos do formulário "html" a serem enviados
        formData.append('password', password); // Essas 3 linhas são os campos do formulário "html" a serem enviados

        sendData('user', formData, 'POST'); // Faz a requisição enviando os dados para o backend

        // Abaixo: Verificação se a requisição foi atendida com sucesso (Neste caso o exemplo de uma autenticação)
        if (data && data.authenticated) {
            localStorage.setItem('token', data.token); // Armazena o token na localStorage
            setIsAuthenticated(true); // Ativa a autenticação
        }
    };

    //continuação do componente
};
export default MeuComponenteTeste;
*/

import { useState, useCallback } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * Hook para enviar dados para um endpoint especificado.
 *
 * @returns {Object} Um objeto contendo a função sendData e os estados de loading, error e data.
 */
const useSendData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const sendData = useCallback(async (endpoint, dataToSend, method = 'POST', isContentTypeText = true) => {
        setLoading(true);
        setError(null);

        const url = `https://servidor.backend.url/${endpoint}`;
        const config = {
            headers: {
                'Content-Type': isContentTypeText ? 'text/html' : 'multipart/form-data'
            },
            withCredentials: true
        };

        try {
            let response;

            if (method === 'POST') {
                response = await axios.post(url, dataToSend, config);
            } else if (method === 'GET') {
                response = await axios.get(url, config);
            } else {
                throw new Error(`Método HTTP não suportado: ${method}`);
            }
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { sendData, loading, error, data };
};

export default useSendData;
