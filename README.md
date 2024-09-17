# Serviços UFSC

## Descrição

O "Serviços UFSC" é uma plataforma desenvolvida para facilitar a comunicação entre os membros da Universidade Federal de Santa Catarina (UFSC), permitindo a troca e divulgação de serviços e oportunidades. O objetivo é conectar professores, alunos e funcionários da UFSC que oferecem ou buscam serviços variados, como aulas particulares, assistência técnica, ou outros serviços especializados, promovendo um ambiente de colaboração e suporte dentro da comunidade universitária.

## Funcionalidades

- Autenticação de usuários com login e cadastro
- Permite que usuários cadastrem e atualizem seus perfis
- Criação e compartilhamento de anúncios de serviços
- Sistema de busca e filtragem de serviços por categoria
- Possibilidade de interagir com outros usuários via mensagens privadas
- Design responsivo para desktop e dispositivos móveis
- Hospedagem 24/7 na Nuvem UFSC ou servidor externo

## Arquitetura da Aplicação

A aplicação segue a arquitetura **MVC (Model-View-Controller)** para organizar o código de forma modular e escalável.

- **Front-end**: Desenvolvido com ReactJS, responsável por toda a interface do usuário.
- **Back-end**: Construído com Node.js e Express, fornecendo a API REST para comunicação com o front-end.
- **Banco de dados**: MongoDB, para armazenar informações dos usuários e anúncios de serviços.
- **Autenticação**: Implementada com JWT (JSON Web Tokens) para garantir segurança nas sessões de usuário.

## Tecnologias Utilizadas

- **Front-end**: ReactJS, HTML5, CSS3, JavaScript
- **Back-end**: Node.js, Express
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT
- **Hospedagem**: Nuvem UFSC ou [Nome do Servidor Externo]
- **Controle de Versão**: Git e GitHub

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- MongoDB instalado ou acesso a um servidor MongoDB

### Passos para execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/nomedogrupo/servicos-ufsc.git
   cd servicos-ufsc
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   PORT=3000
   MONGODB_URI=<URL do seu MongoDB>
   JWT_SECRET=<chave secreta para JWT>
   ```

4. Execute o servidor:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação:
   Abra o navegador e vá até `http://localhost:3000`

## Deploy

A aplicação está disponível 24/7 no seguinte link: [Serviços UFSC](http://url-da-aplicacao.com)

## Contribuições

Este projeto foi desenvolvido como parte do Trabalho Prático da disciplina de Programação Web (INE5646) na UFSC.

### Desenvolvedores

- [Arthur da Cunha Lemes Maciel (23200489)](https://github.com/artlemes)
- [Carlos Augusto Duarte (23250874)](https://github.com/carlosad1981)
- [Lucas Rodrigues Goes (23200499)](https://github.com/LucasG0es)
- [Jonathan Moraes Pereira (23205205)](https://github.com/jonathnperr)
- [Renan dos Santos Silva (23203806)](https://github.com/renanss4)

## Licença

Este projeto é open-source e está licenciado sob a [Licença MIT](LICENSE).
