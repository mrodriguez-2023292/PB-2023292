import { Router } from "express"
import { getUsers } from "./admin.controller.js"
import { getUsersValidator } from "../middlewares/users-validator.js"

const router = Router()

router.get(
    "/",
    getUsersValidator,
    getUsers
)

export default router