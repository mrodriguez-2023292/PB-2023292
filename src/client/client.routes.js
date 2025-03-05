import { Router } from "express"
import { getProducts, getPurchaseHistory } from "./client.controller.js"
import { getClientValidator } from "../middlewares/users-validator.js"

const router = Router()

router.get(
    "/productExploration",
    getProducts
)

router.get(
    "/clientHistory",
    getClientValidator,
    getPurchaseHistory
)

export default router