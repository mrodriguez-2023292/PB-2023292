import { Schema, model } from "mongoose"

const productsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }
},

{
    timestamps: true,
    versionKey: false
})

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [50, "El nombre no puede exceder los 50 caracteres"]
    },

    description: {
        type: String,
        maxLength: [250, "La descripción no puede exceder los 250 caracteres"],
        default: "Sin descripción"
    },

    products: [productsSchema],

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
