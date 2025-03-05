import { Router } from "express"
import { addProduct, getProductById, getProducts, editProduct, deleteProduct } from "./product.controller.js"
import { addProductValidator, getProductsValidator, editProductValidator, deleteProductValidator } from "../middlewares/products-validator.js"

const router = Router()

/**
 * @swagger
 * /storeSystem/v1/product/addProduct:
 *   post:
 *     summary: Añadir un nuevo producto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 example: "A high-performance laptop"
 *               price:
 *                 type: number
 *                 example: 1200
 *               stock:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       201:
 *         description: Producto agregado correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al guardar el producto
 */
router.post(
    "/addProduct", 
    addProductValidator, 
    addProduct
)

/**
 * @swagger
 * /storeSystem/v1/product/getProductById/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido con éxito
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al obtener el producto
 */
router.get(
    "/getProductById/:id", 
    getProductsValidator, 
    getProductById
)

/**
 * @swagger
 * /storeSystem/v1/product/getProducts:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Product]
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
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       500:
 *         description: Error al obtener los productos
 */
router.get(
    "/getProducts", 
    getProductsValidator, 
    getProducts
)

/**
 * @swagger
 * /storeSystem/v1/product/editProduct/{id}:
 *   put:
 *     summary: Editar un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 example: "An updated high-performance laptop"
 *               price:
 *                 type: number
 *                 example: 1300
 *               stock:
 *                 type: number
 *                 example: 45
 *               category:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto o categoría no encontrada
 *       500:
 *         description: Error al actualizar el producto
 */
router.put(
    "/editProduct/:id", 
    editProductValidator, 
    editProduct
)

/**
 * @swagger
 * /storeSystem/v1/product/deleteProduct/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete(
    "/deleteProduct/:id", 
    deleteProductValidator, 
    deleteProduct
)

export default router