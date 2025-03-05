import { Router } from "express"
import { addCart, addProduct } from "./shoppingCart.controller.js"
import { addCartValidator } from "../middlewares/shoppingCart-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/shoppingCart/addCart:
 *   post:
 *     summary: Obtener el carrito de compras del cliente
 *     tags: [ShoppingCart]
 *     responses:
 *       200:
 *         description: Carrito de compra obtenido correctamente
 *       500:
 *         description: Error al obtener el carrito de compra
 */
router.post(
    "/addCart",
    addCartValidator,
    addCart
)

/**
 * @swagger
 * /storeSystem/v1/shoppingCart/addProduct/{id}:
 *   post:
 *     summary: Añadir un producto al carrito de compras
 *     tags: [ShoppingCart]
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
 *               product:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto agregado correctamente al carrito
 *       404:
 *         description: Carrito de compras o producto no encontrado
 *       500:
 *         description: Error al agregar el producto al carrito
 */
router.post(
    "/addProduct/:id",
    addCartValidator,
    addProduct
)

export default router