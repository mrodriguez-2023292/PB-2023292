import { Router } from "express"
import { getProducts, getPurchaseHistory, editProfile, deleteAccount } from "./client.controller.js"
import { getClientValidator, editProfileValidator } from "../middlewares/users-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/client/productExploration:
 *   get:
 *     summary: Explorar productos
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Límite de productos a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Desde qué producto empezar a obtener
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del producto a buscar
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoría del producto a buscar
 *       - in: query
 *         name: ordenarPor
 *         schema:
 *           type: string
 *           enum: [sales, name]
 *           default: sales
 *         description: Criterio de ordenación
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Orden ascendente o descendente
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       500:
 *         description: Error al obtener los productos
 */
router.get(
    "/productExploration",
    getProducts
)

/**
 * @swagger
 * /storeSystem/v1/client/clientHistory:
 *   get:
 *     summary: Obtener historial de compras del cliente
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Historial de compras obtenido con éxito
 *       404:
 *         description: No se encontraron compras para este cliente
 *       500:
 *         description: Error al obtener el historial de compras
 */
router.get(
    "/clientHistory",
    getClientValidator,
    getPurchaseHistory
)

/**
 * @swagger
 * /storeSystem/v1/client/editProfile:
 *   put:
 *     summary: Editar perfil del cliente
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       400:
 *         description: El correo electrónico o nombre de usuario ya está registrado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al actualizar el perfil
 */
router.put(
    "/editProfile",
    editProfileValidator,
    editProfile
)

/**
 * @swagger
 * /storeSystem/v1/client/deleteAccount:
 *   delete:
 *     summary: Eliminar cuenta del cliente
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Cuenta eliminada correctamente
 *       400:
 *         description: La contraseña no es correcta
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al eliminar la cuenta
 */
router.delete(
    "/deleteAccount",
    getClientValidator,
    deleteAccount
)

export default router