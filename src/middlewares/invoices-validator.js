import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWTClient } from "./validate-jwt.js"

export const InvoiceValidator = [
    validateJWTClient,
    validarCampos,
    deleteFileOnError,
    handleErrors
]