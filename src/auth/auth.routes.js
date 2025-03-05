import { Router } from "express"
import { registerClient, loginClient, loginAdmin } from "./auth.controller.js"
import { registerClientValidator, loginValidator } from "../middlewares/users-validator.js"

const router = Router()

router.post(
    "/registerClient",
    registerClientValidator, 
    registerClient
)

router.post(
    "/loginClient",
    loginValidator,
    loginClient
)

router.post(
    "/loginAdmin",
    loginValidator,
    loginAdmin
)

export default router