"use strict"

import shoppingCart from "./shoppingCart.model.js"
import Client from "../client/client.model.js"
import Product from "../product/product.model.js"

export const addCart = async (req, res) => {
    try {
        const { _id: clientId } = req.client

        const cart = await shoppingCart.create({
            ...req.body,
            client: clientId
        })

        res.status(201).json({
            success: true,
            message: "Carrito de compra agregado correctamente",
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar el carrito de compra",
            error: error.message
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { product, quantity } = req.body

        const cart = await shoppingCart.findById(id)
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Carrito de compras no encontrado"
            })
        }

        const productId = await Product.findById(product)
        if(!productId){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        const productTotalPrice = productId.price * quantity

        await shoppingCart.findByIdAndUpdate(
            id,
            { 
                $push: { 
                    products: {
                        product: product,
                        name: productId.name,
                        price: productId.price,
                        quantity: quantity,
                        totalPrice: productTotalPrice
                    }
                },
                $inc: { totalAmount: productTotalPrice }
            }
        )

        const updatedCart = await shoppingCart.findById(id)

        res.status(201).json({
            success: true,
            message: "Producto agregado correctamente al carrito",
            cart: updatedCart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al agregar el producto",
            error: error.message
        })
    }
}