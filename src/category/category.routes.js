import { Router } from "express"
import { addCategory, getCategories, editCategory, deleteCategory } from "./category.controller.js"
import { addCategoryValidator, getCategoriesValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/categories-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/category/addCategory:
 *   post:
 *     summary: Añadir una nueva categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "Category for electronic products"
 *     responses:
 *       201:
 *         description: Categoría agregada correctamente
 *       500:
 *         description: Error al guardar la categoría
 */
router.post(
    "/addCategory", 
    addCategoryValidator, 
    addCategory
)

/**
 * @swagger
 * /storeSystem/v1/category/getCategories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Límite de categorías a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Desde qué categoría empezar a obtener
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito
 *       500:
 *         description: Error al obtener las categorías
 */
router.get(
    "/getCategories", 
    getCategoriesValidator, 
    getCategories
)

/**
 * @swagger
 * /storeSystem/v1/category/editCategory/{id}:
 *   put:
 *     summary: Editar una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 example: "Updated description for electronic products"
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la categoría
 */
router.put(
    "/editCategory/:id", 
    editCategoryValidator, 
    editCategory
)

/**
 * @swagger
 * /storeSystem/v1/category/deleteCategory/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
router.delete(
    "/deleteCategory/:id", 
    deleteCategoryValidator, 
    deleteCategory
)

export default router