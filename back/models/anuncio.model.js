import mongoose, { Schema } from "mongoose";

const anuncioSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é necessário!"],
      trim: true,
      minlength: [2, "O título precisa ter pelo menos 2 caracteres!"],
      maxlength: [50, "O título precisa ter no máximo 50 caracteres!"],
    },
    descricao: {
      type: String,
      required: [true, "A descrição é necessária!"],
      trim: true,
      minlength: [2, "A descrição precisa ter pelo menos 2 caracteres!"],
      maxlength: [100, "A descrição precisa ter no máximo 100 caracteres!"],
    },
    preco: {
      type: Number,
      required: [true, "O preço é necessário!"],
      min: [0, "O preço não pode ser negativo!"],
      max: [1000000000, "O preço não pode ser maior que 1.000.000.000!"],
    },
    categoria_id: {
      type: Schema.Types.ObjectId,
      ref: "Categorias",
      required: [true, "A categoria é necessária!"],
    },
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuarios",
      required: [true, "O usuário é necessário!"],
    },
    data_publicacao: {
      type: Date,
      default: Date.now,
    },
    data_expiracao: {
      type: Date,
      required: [true, "A data de expiração é necessária!"],
    },
    visibilidade: {
      type: String,
      enum: ["publico", "privado", "compartilhado"],
      default: "privado",
    },
    compartilhado_com: [
      {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware para validar a data de expiração
// anuncioSchema.pre("save", function (next) {
//   if (this.isModified("data_expiracao") && this.data_expiracao < new Date()) {
//     return next(new Error("A data de expiração não pode ser no passado."));
//   }
//   next();
// });

// Middleware para validar a data de expiração em atualizações (caso seja alterada)
// anuncioSchema.pre("findOneAndUpdate", function (next) {
//   if (this._update.data_expiracao && this._update.data_expiracao < new Date()) {
//     return next(new Error("A data de expiração não pode ser no passado."));
//   }
//   next();
// });

export const anuncioModel = mongoose.model("Anuncios", anuncioSchema);
