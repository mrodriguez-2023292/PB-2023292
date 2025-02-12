import { Router } from "express"
import { registerClient, loginClient, loginAdmin } from "./auth.controller.js"
import { registerValidatorClient, loginValidator } from "../middlewares/users-validator.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

router.post(
    "/registerClient",
    uploadProfilePicture.single("profilePicture"), 
    registerValidatorClient, 
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