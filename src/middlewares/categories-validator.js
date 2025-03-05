import { body, param } from "express-validator"
import { categoryNameExists, categoryExists } from "../helpers/db-validators.js"
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

export const getCategoriesValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE")
]

export const editCategoryValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    body("name").custom(categoryNameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]
