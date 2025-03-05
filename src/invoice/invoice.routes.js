import { Router } from "express"
import { generateInvoice, getInvoicesByClient } from "./invoice.controller.js"
import { InvoiceValidator } from "../middlewares/invoices-validator.js"

const router = Router()

router.post(
    "/generateInvoice/:id",
    InvoiceValidator,
    generateInvoice
)

router.get(
    "/seeInvoice",
    InvoiceValidator,
    getInvoicesByClient
)

export default router