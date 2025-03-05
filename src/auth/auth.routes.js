import { Router } from "express"
import { registerClient, loginClient, loginAdmin } from "./auth.controller.js"
import { registerClientValidator, loginValidator } from "../middlewares/users-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/auth/registerClient:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error al registrar el usuario
 */
router.post(
    "/registerClient",
    registerClientValidator, 
    registerClient
)

/**
 * @swagger
 * /storeSystem/v1/auth/loginClient:
 *   post:
 *     summary: Iniciar sesión como cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el inicio de sesión
 */
router.post(
    "/loginClient",
    loginValidator,
    loginClient
)

/**
 * @swagger
 * /storeSystem/v1/auth/loginAdmin:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "adminpassword"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el inicio de sesión
 */
router.post(
    "/loginAdmin",
    loginValidator,
    loginAdmin
)

export default router