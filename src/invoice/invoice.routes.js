import { Router } from "express"
import { generateInvoice, getInvoicesByClient, editInvoice } from "./invoice.controller.js"
import { invoiceAdminValidator, invoiceValidator } from "../middlewares/invoices-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/invoice/generateInvoice/{id}:
 *   post:
 *     summary: Generar una nueva factura
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito de compras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCF:
 *                 type: boolean
 *                 example: true
 *               nit:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Factura generada con éxito
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Carrito de compras no encontrado
 *       500:
 *         description: Error al generar la factura
 */
router.post(
    "/generateInvoice/:id",
    invoiceValidator,
    generateInvoice
)

/**
 * @swagger
 * /storeSystem/v1/invoice/seeInvoice/{cid}:
 *   get:
 *     summary: Ver facturas de un cliente
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Facturas obtenidas con éxito
 *       404:
 *         description: No hay facturas para este cliente
 *       500:
 *         description: Error al obtener las facturas
 */
router.get(
    "/seeInvoice/:cid",
    invoiceAdminValidator,
    getInvoicesByClient
)

/**
 * @swagger
 * /storeSystem/v1/invoice/editInvoice/{invoiceId}:
 *   put:
 *     summary: Editar una factura
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 100
 *               isCF:
 *                 type: boolean
 *                 example: true
 *               nit:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Factura actualizada con éxito
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error al actualizar la factura
 */
router.put(
    "/editInvoice/:invoiceId",
    invoiceAdminValidator,
    editInvoice
)

export default router