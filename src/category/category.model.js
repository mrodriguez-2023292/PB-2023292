import { Schema, model } from "mongoose"

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"],
        unique: true,
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },

    description: {
        type: String,
        maxLength: [250, "La descripción no puede exceder los 250 caracteres"],
        default: "Sin descripción"
    },

    status: {
        type: Boolean,
        default: true
    }
}, 

{
    versionKey: false,
    timestamps: true
})

export default model("Category", categorySchema)
