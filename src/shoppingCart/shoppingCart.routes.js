import { Router } from "express"
import { addCart, addProduct } from "./shoppingCart.controller.js"
import { addCartValidator } from "../middlewares/shoppingCart-validator.js"

const router = Router()

router.post(
    "/addCart",
    addCartValidator,
    addCart
)

router.post(
    "/addProduct/:id",
    addCartValidator,
    addProduct
)

export default router