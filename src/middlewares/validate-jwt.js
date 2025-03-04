import jwt from "jsonwebtoken"
import Admin from "../admin/admin.model.js"
import Client from "../client/client.model.js"

export const validateJWTAdmin = async (req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "");

        const { aid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const admin = await Admin.findById(aid)
        console.log(admin)

        if(!admin){
            return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
            })
        }

        if(!admin.status){
            return res.status(400).json({
                success: false,
                message: "Usuario fue desactivado previamente"
            })
        }

        req.admin = admin
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}

export const validateJWTClient = async (req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "");

        const { cid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const client = await Client.findById(cid)

        if(!client){
            return res.status(400).json({
                success: false,
                message: "Usuario no existe en la DB"
            })
        }

        if(!client.status){
            return res.status(400).json({
                success: false,
                message: "Usuario fue desactivado previamente"
            })
        }

        req.client = client
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}