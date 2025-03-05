import { Schema, model } from "mongoose"

const invoiceSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },

    products: [
        {
            name: String,
            quantity: Number,
            price: Number,
            totalPrice: Number
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    isCF: {
        type: Boolean,
        default: true
    },

    nit: {
        type: String,
        required: function() { return !this.isCF }
    }

}, 

{
    timestamps: true,
    versionKey: false
})

export default model("Invoice", invoiceSchema)
