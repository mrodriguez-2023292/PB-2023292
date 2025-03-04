import { body } from "express-validator"
import { productNameExists, categoryExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js"
import { validateJWTAdmin } from "./validate-jwt.js"

export const addProductValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE"),
    body("name").custom(productNameExists),
    body("description").notEmpty().withMessage("La descripción del producto es obligatoria"),
    body("price").notEmpty().withMessage("El precio del producto es obligatorio")
        .isNumeric().withMessage("El precio debe ser un número")
        .isFloat({ min: 0 }).withMessage("El precio no puede ser negativo"),
    body("stock").notEmpty().withMessage("La cantidad en stock es obligatoria")
        .isInt({ min: 0 }).withMessage("El stock no puede ser negativo"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]