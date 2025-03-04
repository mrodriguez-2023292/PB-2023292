import { body } from "express-validator"
import { categoryNameExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js"
import { validateJWTAdmin } from "./validate-jwt.js"

export const addCategoryValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE"),
    body("name").custom(categoryNameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
