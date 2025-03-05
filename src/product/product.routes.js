import { Router } from "express"
import { addProduct, getProductById, getProducts, editProduct, deleteProduct } from "./product.controller.js"
import { addProductValidator, getProductsValidator, editProductValidator, deleteProductValidator } from "../middlewares/products-validator.js"

const router = Router()

router.post(
    "/addProduct", 
    addProductValidator, 
    addProduct
)

router.get(
    "/getProductById/:id", 
    getProductsValidator, 
    getProductById
)

router.get(
    "/getProducts", 
    getProductsValidator, 
    getProducts
)

router.put(
    "/editProduct/:id", 
    editProductValidator, 
    editProduct
)

router.delete(
    "/deleteProduct/:id", 
    deleteProductValidator, 
    deleteProduct
)

export default router