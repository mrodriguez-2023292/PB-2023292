"use strict"

import Invoice from "./invoice.model.js"
import Product from "../product/product.model.js"
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
        const { isCF, nit } = req.body

        if (!isCF && !nit) {
            return res.status(400).json({
                success: false,
                message: "Es necesario proporcionar el NIT si no es un consumidor final"
            })
        }

        const cart = await shoppingCart.findById(id).populate('client')
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Carrito de compras no encontrado"
            })
        }

        if (cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "El carrito está vacío"
            })
        }

        const invoiceData = {
            client: cart.client,
            products: cart.products.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice
            })),
            totalAmount: cart.totalAmount,
            date: new Date(),
            isCF: isCF,
            nit: isCF ? undefined : nit
        }

        const newInvoice = await Invoice.create(invoiceData)

        await shoppingCart.findByIdAndUpdate(id, {
            status: "completed",
            products: [],
            totalAmount: 0
        })

        for (let item of cart.products) {
            const foundProduct = await Product.findById(item.product)

            if (!foundProduct) {
                return res.status(404).json({
                    success: false,
                    message: `Producto con ID ${item.product} no encontrado`
                })
            }

            if (foundProduct.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `No hay suficiente stock para el producto: ${foundProduct.name}`
                })
            }

            foundProduct.stock -= item.quantity
            foundProduct.sales += item.quantity

            await foundProduct.save()
        }

        const doc = new PDFDocument()
        const invoicePDFPath = path.join(__dirname, `../../invoices/invoice_${newInvoice._id}.pdf`)
        
        const dir = path.dirname(invoicePDFPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        const stream = fs.createWriteStream(invoicePDFPath)
        doc.pipe(stream)

        doc.fontSize(20).text("Factura de Compra", { align: "center" })
        doc.moveDown()
        doc.fontSize(14).text(`Fecha: ${new Date().toLocaleString()}`)
        doc.moveDown()

        doc.fontSize(14).text(`Cliente: ${cart.client.name}`)
        doc.moveDown()

        if (newInvoice.isCF) {
            doc.fontSize(14).text("Consumidor Final")
        } else {
            doc.fontSize(14).text(`NIT: ${newInvoice.nit}`)
        }

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

        doc.moveDown(15)
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
        const { cid: clientId } = req.params

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

export const editInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params
        const { products, isCF, nit } = req.body

        const invoice = await Invoice.findById(invoiceId).populate('client')

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Factura no encontrada"
            })
        }

        let totalAmount = 0

        for (let item of products) {
            const foundProduct = await Product.findById(item.product)

            if (!foundProduct) {
                return res.status(404).json({
                    success: false,
                    message: `Producto con ID ${item.product} no encontrado`
                })
            }

            if (foundProduct.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `No hay suficiente stock para el producto: ${foundProduct.name}`
                })
            }

            const totalPrice = item.price * item.quantity

            totalAmount += totalPrice

            item.totalPrice = totalPrice
        }

        invoice.products = products
        invoice.totalAmount = totalAmount
        invoice.isCF = isCF
        invoice.nit = isCF ? undefined : nit
        invoice.date = new Date()

        await invoice.save()

        for (let item of products) {
            const foundProduct = await Product.findById(item.product)

            foundProduct.stock -= item.quantity
            foundProduct.sales += item.quantity

            await foundProduct.save()
        }

        const doc = new PDFDocument()
        const invoicePDFPath = path.join(__dirname, `../../invoices/invoice_${invoice._id}.pdf`)

        const dir = path.dirname(invoicePDFPath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        const stream = fs.createWriteStream(invoicePDFPath)
        doc.pipe(stream)

        doc.fontSize(20).text("Factura de Compra", { align: "center" })
        doc.moveDown()
        doc.fontSize(14).text(`Fecha: ${new Date().toLocaleString()}`)
        doc.moveDown()

        doc.fontSize(14).text(`Cliente: ${invoice.client.name}`)
        doc.moveDown()

        if (invoice.isCF) {
            doc.fontSize(14).text("Consumidor Final")
        } else {
            doc.fontSize(14).text(`NIT: ${invoice.nit}`)
        }

        doc.moveDown()
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()

        doc.fontSize(14).text("Productos", { align: "center" })
        doc.moveDown()
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()

        invoice.products.forEach(item => {
            doc.text(`${item.name} - Cantidad: ${item.quantity} - Precio: ${item.price} - Total: ${item.totalPrice}`)
        })

        doc.moveDown(15)
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
        doc.moveDown()

        doc.text(`Total a pagar: ${invoice.totalAmount}`)
        doc.moveDown()

        doc.end()

        stream.on("finish", () => {
            res.status(200).json({
                success: true,
                message: "Factura actualizada con éxito",
                invoice,
                pdfPath: invoicePDFPath
            })
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al editar la factura",
            error: error.message
        })
    }
}