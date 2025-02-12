"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "../src/auth/auth.routes.js"
import adminRoutes from "../src/admin/admin.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import Admin from "../src/admin/admin.model.js"
import { dbConnection } from "./mongo.js"
import { hash } from "argon2"

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
        createAdminUser();
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}

const createAdminUser = async () => {
    try {
        const adminExists = await Admin.findOne({ role: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("El usuario admin ya existe");
            return;
        }

        const adminData = {
            name: 'Juan',
            surname: 'Pérez',
            username: 'juanperez_admin',
            email: 'juan.perez@admin.com',
            phone: '12345678',
            password: 'Dm@n1234',
            role: 'ADMIN_ROLE',
        };

        const encryptedPassword = await hash(adminData.password);
        adminData.password = encryptedPassword;

        await Admin.create(adminData);

        console.log("Admin ingresado correctamente");
    } catch (err) {
        console.error("Error al crear el admin:", err.message);
    }
}