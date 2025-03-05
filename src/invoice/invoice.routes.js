import { Router } from "express"
import { generateInvoice, getInvoicesByClient, editInvoice } from "./invoice.controller.js"
import { invoiceAdminValidator, invoiceValidator } from "../middlewares/invoices-validator.js"

const router = Router()

router.post(
    "/generateInvoice/:id",
    invoiceValidator,
    generateInvoice
)

router.get(
    "/seeInvoice/:cid",
    invoiceAdminValidator,
    getInvoicesByClient
)

router.put(
    "/editInvoice/:invoiceId",
    invoiceAdminValidator,
    editInvoice
)

export default router