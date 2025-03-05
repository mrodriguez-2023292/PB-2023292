"use strict"

import Invoice from "./invoice.model.js"
import shoppingCart from "../shoppingCart/shoppingCart.model.js"

export const generateInvoice = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await shoppingCart.findById(id)
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Carrito de compras no encontrado"
            })
        }

        if(cart.products.length === 0){
            return res.status(400).json({
                success: false,
                message: "El carrito está vacío"
            })
        }

        const invoice = {
            client: cart.client,
            products: cart.products.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice
            })),
            totalAmount: cart.totalAmount,
            date: new Date()
        }

        const newInvoice = await Invoice.create(invoice)

        await shoppingCart.findByIdAndUpdate(id, { 
            status: "completed",
            products: [],
            totalAmount: 0 
        })

        res.status(200).json({
            success: true,
            message: "Compra completada con éxito",
            invoice: newInvoice
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al completar la compra",
            error: error.message
        })
    }
}

export const getInvoicesByClient = async (req, res) => {
    try {
        const { _id: clientId } = req.client

        const invoices = await Invoice.find({ client: clientId })

        if (invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay facturas para este cliente"
            })
        }

        res.status(200).json({
            success: true,
            invoices
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener facturas",
            error: error.message
        })
    }
}