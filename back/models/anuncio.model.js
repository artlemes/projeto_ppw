import mongoose, {Schema} from "mongoose"

const anuncioSchema = new Schema(
    {
        titulo: {

        },
        descricao: {

        },
        detalhesGerais: {

        },
        detalhesDoAnuncio: {

        },
        imagens: {

        }
    },
    {
        timestamps: false,
    }
);

export const anuncioModel = mongoose.model("Anuncios", anuncioSchema)