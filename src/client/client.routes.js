import { Router } from "express"
import { getProducts } from "./client.controller.js"

const router = Router()

router.get(
    "/productExploration",
    getProducts
)

export default router