

export const cadastrarUsuario = async (userData) => {
    return fetch('http://localhost:3000/api/cadastro', {  /*arrumar o caminho nao sei aaaaaaaa*/
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const fazerLogin = async (userData) => {
    return fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};