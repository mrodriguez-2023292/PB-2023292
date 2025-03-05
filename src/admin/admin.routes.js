import { Router } from "express"
import { addUser, getUsers, editRoleUser, editUser, deleteUser } from "./admin.controller.js"
import { addUserValidator, getUsersValidator, editRoleUserValidator, editUserValidator, deleteUserValidator } from "../middlewares/users-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/admin/addUser:
 *   post:
 *     summary: Añadir un nuevo usuario
 *     tags: [Admin]
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
 *               role:
 *                 type: string
 *                 example: "ADMIN_ROLE"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error al registrar el usuario
 */
router.post(
    "/addUser",
    addUserValidator,
    addUser
)

/**
 * @swagger
 * /storeSystem/v1/admin/getUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Límite de usuarios a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Desde qué usuario empezar a obtener
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get(
    "/getUsers",
    getUsersValidator,
    getUsers
)

/**
 * @swagger
 * /storeSystem/v1/admin/editRoleUser/{userId}:
 *   patch:
 *     summary: Editar el rol de un usuario
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "CLIENT_ROLE"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el rol
 */
router.patch(
    "/editRoleUser/:userId",
    editRoleUserValidator,
    editRoleUser
)

/**
 * @swagger
 * /storeSystem/v1/admin/editUser/{userId}:
 *   put:
 *     summary: Editar un usuario
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
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
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put(
    "/editUser/:userId",
    editUserValidator,
    editUser
)

/**
 * @swagger
 * /storeSystem/v1/admin/deleteUser/{userId}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete(
    "/deleteUser/:userId",
    deleteUserValidator,
    deleteUser
)

export default router