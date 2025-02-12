import { hash, verify } from "argon2"
import Client from "../client/client.model.js";
import Admin from "../admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const registerClient = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const client = await Client.create(data);

        return res.status(201).json({
            message: "User has been created",
            username: client.username,
            email: client.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const loginClient = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const client = await Client.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!client){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(client.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(client.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: client.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}

export const loginAdmin = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const admin = await Admin.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(admin.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}