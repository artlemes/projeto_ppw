import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é necessário!"],
      trim: true,
      minlength: [2, "O nome precisa ter pelo menos 2 caracteres!"],
    },
    email: {
      type: String,
      required: [true, "O nome é necessário!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: {},
        message: (props) => `${props.value} não é um email válido`,
      },
    },
    cpf: {
      type: String,
      required: [true, "O CPF é necessário!"],
      unique: true,
      trim: true,
      validate: {
        validator: {},
        message: (props) => `${props.value} não é um cpf válido`,
      },
    },
    senha: {
      type: String,
      required: [true, "A senha é necessário!"],
      minlength: [2, "A senha precisa ter pelo menos 6 caracteres!"],
    },
  },
  {
    timestamps: true,
  }
);

export const usuariosModel = mongoose.model("Usuarios", usuarioSchema);
