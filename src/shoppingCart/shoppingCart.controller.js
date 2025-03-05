"use strict"

import shoppingCart from "./shoppingCart.model.js"
import Product from "../product/product.model.js"

const getDefaultCart = async (clientId) => {
    let cart = await shoppingCart.findOne({ client: clientId })

    if(!cart){
        cart = await shoppingCart.create({
            client: clientId,
            products: [],
            totalAmount: 0
        })
        console.log(`Carrito por defecto creado para el cliente ${clientId}`)
    }
    return cart
}

export const addCart = async (req, res) => {
    try {
        const { _id: clientId } = req.client

        const cart = await getDefaultCart(clientId)

        res.status(200).json({
            success: true,
            message: "Carrito de compra obtenido correctamente",
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el carrito de compra",
            error: error.message
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { product, quantity } = req.body

        const cart = await shoppingCart.findById(id)
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Carrito de compras no encontrado"
            })
        }

        const productId = await Product.findById(product)
        if (!productId) {
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
            message: "Error al agregar el producto al carrito",
            error: error.message
        })
    }
}
