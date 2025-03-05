"use strict"

import Invoice from "./invoice.model.js"
import shoppingCart from "../shoppingCart/shoppingCart.model.js"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

        const doc = new PDFDocument()

        const invoicePDFPath = path.join(__dirname, `../../invoices/invoice_${newInvoice._id}.pdf`)
        const stream = fs.createWriteStream(invoicePDFPath)
        doc.pipe(stream)

        doc.fontSize(20).text("Factura de Compra", { align: "center" })
        doc.moveDown()
        doc.fontSize(14).text(`Fecha: ${new Date().toLocaleString()}`)
        doc.moveDown()
        doc.fontSize(14).text(`Cliente: ${cart.client}`)
        doc.moveDown()
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()
        doc.fontSize(14).text("Productos", { align: "center" })
        doc.moveDown()
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()
        cart.products.forEach(item => {
            doc.text(`${item.name} - Cantidad: ${item.quantity} - Precio: ${item.price} - Total: ${item.totalPrice}`)
        })
        doc.moveDown(25)
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()
        doc.text(`Total a pagar: ${cart.totalAmount}`)
        doc.moveDown()

        doc.end()

        stream.on("finish", () => {
            res.status(200).json({
                success: true,
                message: "Compra completada con éxito",
                invoice: newInvoice,
                pdfPath: invoicePDFPath 
            })
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