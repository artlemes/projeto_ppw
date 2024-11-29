export const USUARIO_ERROR = {
  USUARIO_NAO_ENCONTRADO: {
    statusCode: 404,
    message: "Usuário não encontrado",
  },
  USUARIO_JA_EXISTE: {
    statusCode: 400,
    message: "Usuário já existe",
  },
  CAMPOS_NAO_PREENCHIDOS: {
    statusCode: 422,
    message: "Os campos não foram preenchidos corretamente",
  },
};

export const ANUNCIO_ERROR = {
  ANUNCIO_NAO_ENCONTRADO: {
    statusCode: 404,
    message: "Anúncio não encontrado",
  },
  ANUNCIO_JA_EXISTE: {
    statusCode: 400,
    message: "Anúncio já existe",
  },
};

export const CATEGORIA_ERROR = {
  CATEGORIA_NAO_ENCONTRADA: {
    statusCode: 404,
    message: "Categoria não encontrada",
  },
  CATEGORIA_JA_EXISTE: {
    statusCode: 400,
    message: "Categoria já existe",
  },
  CAMPOS_NAO_PREENCHIDOS: {
    statusCode: 422,
    message: "Os campos não foram preenchidos corretamente",
  },
};

export const TOKEN_ERROR = {
  TOKEN_NAO_ENVIADO: {
    statusCode: 401,
    message: "Token não enviado",
  },
  ACESSO_NEGADO: {
    statusCode: 401,
    message: "Acesso negado",
  },
};
