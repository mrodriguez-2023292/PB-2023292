import { Schema, model } from "mongoose"

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },

    description: {
        type: String,
        required: [true, "La descripción del producto es obligatoria"],
        maxLength: [500, "La descripción no puede exceder los 500 caracteres"]
    },

    price: {
        type: Number,
        required: [true, "El precio del producto es obligatorio"],
        min: [0, "El precio no puede ser negativo"]
    },

    stock: {
        type: Number,
        required: [true, "La cantidad en stock es obligatoria"],
        min: [0, "El stock no puede ser negativo"]
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "La categoría es obligatoria"]
    },

    image: {
        type: String
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

export default model("Product", productSchema)
