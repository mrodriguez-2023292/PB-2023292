"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { hash } from "argon2"
import { dbConnection } from "./mongo.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import authRoutes from "../src/auth/auth.routes.js"
import adminRoutes from "../src/admin/admin.routes.js"
import clientRoutes from "../src/client/client.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/product/product.routes.js"
import shoppingCartRoutes from "../src/shoppingCart/shoppingCart.routes.js"
import invoiceRoutes from "../src/invoice/invoice.routes.js"
import Admin from "../src/admin/admin.model.js"
import Category from "../src/category/category.model.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/storeSystem/v1/auth", authRoutes)
    app.use("/storeSystem/v1/admin", adminRoutes)
    app.use("/storeSystem/v1/client", clientRoutes)
    app.use("/storeSystem/v1/category", categoryRoutes)
    app.use("/storeSystem/v1/product", productRoutes)
    app.use("/storeSystem/v1/shoppingCart", shoppingCartRoutes)
    app.use("/storeSystem/v1/invoice", invoiceRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        createAdminUser()
        createDefaultCategory()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}

export const createAdminUser = async () => {
    try {
        const adminExists = await Admin.findOne({
            $or: [
                { email: "admin@example.com" },
                { role: "ADMIN_ROLE" }
            ]
        })

        if (adminExists) {
            console.log("El usuario administrador ya existe")
            return
        }

        const adminData = {
            name: "Admin",
            surname: "Principal",
            username: "admin_master",
            email: "admin@example.com",
            phone: "12345678",
            password: "Dm@n1234",
            role: "ADMIN_ROLE"
        }

        adminData.password = await hash(adminData.password)

        await Admin.create(adminData)

        console.log("Usuario administrador creado con éxito")
    } catch (err) {
        console.error("Error al crear el usuario administrador:", err.message)
    }
}

export const createDefaultCategory  = async () => {
    try {
        const categoryExists = await Category.findOne({ name: "Sin categoría" })

        if (categoryExists) {
            console.log("La categoría por defecto ya existe")
            return
        }

        const categoryData = {
            name: "Sin categoría",
            description: "Productos sin categoría asignada"
        }

        await Category.create(categoryData)

        console.log("La categoria por defecto creada con éxito")
    } catch (err) {
        console.error("Error al crear la categoria por defecto:", err.message)
    }
}