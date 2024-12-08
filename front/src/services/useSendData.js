import { useState, useCallback } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * Hook para enviar dados para um endpoint especificado.
 *
 * @returns {Object} Um objeto contendo a função sendData e os estados de loading, error e data.
 */
const useSendData = () => {
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [data, setData] = useState(null); // Estado da resposta

    const sendData = useCallback(async (endpoint, dataToSend = null, method = 'POST', isContentTypeText = true) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token") ?? "";

        const url = `https://bk-ti1x.onrender.com/${endpoint}`;

        // Configuração dos headers
        const headers = {
            authorization: `Bearer ${token}`,
        };

        // Define Content-Type apenas para POST ou PUT
        if (isContentTypeText && ['POST', 'PUT'].includes(method)) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            headers,
            withCredentials: false, // Desabilita envio automático de cookies
        };

        try {
            // Executa a requisição conforme o método HTTP
            const response = await axios({
                method,
                url,
                data: dataToSend,
                ...config,
            });

            // Armazena a resposta na variável de estado
            setData(response.data);
        } catch (err) {
            // Captura detalhes do erro
            console.error("Erro na requisição:", err);

            // Extrai informações úteis para o estado de erro
            setError({
                message: err.response?.data?.message || err.message,
                status: err.response?.status,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return { sendData, loading, error, data };
};

export default useSendData;
