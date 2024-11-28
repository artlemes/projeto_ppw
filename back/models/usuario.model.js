import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é necessário!"],
      trim: true,
      minlength: [2, "O nome precisa ter pelo menos 2 caracteres!"],
      maxlength: [50, "O nome precisa ter no máximo 50 caracteres!"],
    },
    sobrenome: {
      type: String,
      required: [true, "O sobrenome é necessário!"],
      trim: true,
      minlength: [2, "O sobrenome precisa ter pelo menos 2 caracteres!"],
      maxlength: [50, "O sobrenome precisa ter no máximo 50 caracteres!"],
    },
    email: {
      type: String,
      required: [true, "O email é necessário!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        // email@dominio.com
        validator: (email) =>
          /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/.test(email),
        message: (props) => `${props.value} não é um email válido!`,
      },
    },
    cpf: {
      type: String,
      required: [true, "O CPF é necessário!"],
      unique: true,
      trim: true,
      validate: {
        // xxx.xxx.xxx-xx
        validator: (cpf) => /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(cpf),
        message: (props) => `${props.value} não é um CPF válido!`,
      },
    },
    telefone: {
      type: String,
      required: [true, "O telefone é necessário!"],
      trim: true,
      validate: {
        // (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
        validator: (telefone) => /\(\d{2}\)\s\d{4,5}-\d{4}/.test(telefone),
        message: (props) => `${props.value} não é um telefone válido!`,
      },
    },
    senha: {
      type: String,
      required: [true, "A senha é necessário!"],
      minlength: [6, "A senha precisa ter pelo menos 6 caracteres!"],
    },
    papel: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario",
    },

    // pode ser uma lista vazia
    anuncios: [
      {
        anuncio_id: {
          type: Schema.Types.ObjectId,
          ref: "Anuncios",
          required: true,
          validate: {
            validator: async function (anuncio_id) {
              const anuncio = await mongoose
                .model("Anuncios")
                .findById(anuncio_id);
              return anuncio !== null;
            },
            message: (props) => `${props.value} não é um anúncio válido!`,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const usuarioModel = mongoose.model("Usuarios", usuarioSchema);
