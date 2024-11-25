# Front-end do projeto

Este é o repositório do **Front-End** do projeto **Serviços UFSC**.

## 💻 Tecnologias Utilizadas

- **React.js**
- **CSS**
- **JavaScript**
- **RSuite**

## 📋 Pré-requisitos

Certifique-se de que você tenha instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- **npm**

## 🛠️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/artlemes/projeto_ppw
   ```

2. **Acesse a pasta do front-end:**
   ```bash
   cd front
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Instale o RSuite:**
   ```bash
   npm install rsuite
   ```
 
## 🚀 Executando o Projeto

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

2. **Acesse o front-end:**
   A aplicação estará disponível para execução em [http://localhost:3000](http://localhost:3000).

## 📁 Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plaintext
front/
├── public/              # Arquivos públicos acessíveis diretamente
│   ├── images/          # Imagens utilizadas no projeto
│   ├── index.html       # Documento HTML principal
│   ├── favicon.ico      # Ícone do site
├── src/                 # Código-fonte do projeto
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Serviços, como requisições à API
│   ├── App.js           # Componente principal da aplicação
│   ├── index.js         # Ponto de entrada do React
│   ├── index.css        # Estilos globais
│   ├── routes.js        # Configuração de rotas
├── .gitignore           # Arquivos ignorados pelo Git
├── package.json         # Dependências e scripts do projeto
├── package-lock.json    # Lockfile de dependências
└── README.md            # Documentação do projeto
