export const USUARIO_ERROR = {
  USUARIO_NAO_ENCONTRADO: {
    statusCode: 404,
    message: "Usuário não encontrado",
  },
  USUARIO_JA_EXISTE: {
    statusCode: 400,
    message: "Usuário já existe",
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
};
