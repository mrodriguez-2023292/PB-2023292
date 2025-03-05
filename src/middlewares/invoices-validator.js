import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWTAdmin, validateJWTClient } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const invoiceValidator = [
    validateJWTClient,
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const invoiceAdminValidator = [
    validateJWTAdmin,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]