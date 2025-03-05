import { Schema, model } from "mongoose";

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

    quantity: {
        type: Number,
        required: true,
        min: [1, "La cantidad debe ser al menos 1"],
    },

    totalPrice: {
        type: Number,
    }
}, 

{
    timestamps: true,
    versionKey: false
})

const shoppingCartSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },

    products: [productsSchema],

    totalAmount: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["active", "completed", "abandoned"],
        default: "active"
    }
}, 

{
    timestamps: true,
    versionKey: false
})

export default model("shoppingCart", shoppingCartSchema);
