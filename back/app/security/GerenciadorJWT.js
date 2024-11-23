/*
    ATENÇÃO: este componente js é uma "tradução" que fiz da minha classe de gerenciamento de tokens JWT do PHP
    que uso nos meus projetos. Apesar de no PHP, funcionar, esta "tradução" não testei ainda.
*/

const crypto = require('crypto');
const {JWT_KEY} = require("../../constants/chaves.js");

/**
 * Classe para gerenciar tokens JWT
 * Oferece métodos para criar, verificar, codificar, decodificar e assinar tokens JWT.
 */
class GerenciadorJWT {

    /**
     * Função para codificar dados em base64url
     * @param {object|string} data Dados a serem codificados em base64url
     * @returns {string} Dados codificados em base64url
     */
    codificarBase64url(data) {
        return Buffer.from(JSON.stringify(data))
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    /**
     * Função para decodificar dados de base64url
     * @param {string} str Dados codificados em base64url
     * @returns {object} Dados decodificados
     */
    decodificarBase64url(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) str += '=';
        return JSON.parse(Buffer.from(str, 'base64').toString());
    }

    /**
     * Função para gerar assinatura
     * @param {object} header Cabeçalho do token JWT
     * @param {object} payload Payload do token JWT
     * @returns {string} Assinatura do token JWT
     */
    assinar(header, payload) {
        const signatureInput = `${this.codificarBase64url(header)}.${this.codificarBase64url(payload)}`;
        return crypto
            .createHmac('sha256', JWT_KEY)
            .update(signatureInput)
            .digest('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    /**
     * Criar token JWT
     * @param {object} payload Payload do token JWT
     * @param {string|number} [expiresIn=1h] Tempo de expiração do token JWT
     * @returns {string} Token JWT
     */
    criarToken(payload, expiresIn = '1h') {
        const header = {
            // Algoritmo de assinatura
            alg: 'HS256',
            // Tipo do token
            typ: 'JWT'
        };

        // Adicionar tempo de expiração ao payload
        const now = Math.floor(Date.now() / 1000);
        payload.iat = now;
        payload.exp = now + (typeof expiresIn === 'string'
            ? (expiresIn.endsWith('h') ? parseInt(expiresIn) * 3600
                : expiresIn.endsWith('m') ? parseInt(expiresIn) * 60
                    : parseInt(expiresIn))
            : expiresIn);

        const signature = this.assinar(header, payload);
        return `${this.codificarBase64url(header)}.${this.codificarBase64url(payload)}.${signature}`;
    }

    /**
     * Verificar token JWT
     * @param {string} token Token JWT para verificar
     * @returns {object} Objeto com propriedades valid e payload ou error
     */
    verificarToken(token) {
        try {
            // Dividir token em header, payload e assinatura
            const [headerB64, payloadB64, signatureB64] = token.split('.');

            // Decodificar header e payload
            const header = this.decodificarBase64url(headerB64);
            const payload = this.decodificarBase64url(payloadB64);

            // Verificar algoritmo
            if (header.alg !== 'HS256') {
                throw new Error('Algoritmo não suportado');
            }

            // Verificar assinatura
            const expectedSignature = this.assinar(header, payload);
            if (expectedSignature !== signatureB64) {
                throw new Error('Assinatura inválida');
            }

            // Verificar expiração
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp && payload.exp < now) {
                throw new Error('Token expirado');
            }

            return {
                valid: true,
                payload
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message
            };
        }
    }
}

module.exports = GerenciadorJWT;