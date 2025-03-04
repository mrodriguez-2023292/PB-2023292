import { Router } from "express"
import { addProduct } from "./product.controller.js"
import { addProductValidator } from "../middlewares/products-validator.js"

const router = Router()

router.post(
    "/addProduct", 
    addProductValidator, 
    addProduct
)

export default router