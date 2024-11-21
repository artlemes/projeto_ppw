import mongoose, { Schema } from "mongoose";

const anuncioSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é necessário!"],
      trim: true,
      minlength: [2, "O título precisa ter pelo menos 2 caracteres!"],
    },
    descricao: {
      type: String,
      required: [true, "A descrição é necessária!"],
      trim: true,
      minlength: [2, "A descrição precisa ter pelo menos 2 caracteres!"],
    },
    preco: {
      type: Number,
      required: [true, "O preço é necessário!"],
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categorias",
      required: [true, "A categoria é necessária!"],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: [true, "O usuário é necessário!"],
    },
    // imagens: {
    //     type: [String],
    //     required: [true, "A imagem é necessária!"],
    // },
    // expiracao: {
    //   type: Date,
    //   required: [true, "A data de expiração é necessária!"],
    // },
  },
  {
    timestamps: true,
  }
);

export const anuncioModel = mongoose.model("Anuncios", anuncioSchema);
