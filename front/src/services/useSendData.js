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
