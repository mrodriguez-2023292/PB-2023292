import { hash, verify } from "argon2"
import Client from "../client/client.model.js"
import Admin from "../admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const registerClient = async (req, res) => {
    try {
        const data = { ...req.body }
        data.password = await hash(data.password)

        const client = await Client.create(data)

        return res.status(201).json({
            message: "Usuario creado con éxito",
            username: client.username,
            email: client.email
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el usuario",
            error: err.message
        })
    }
}

const loginUser = async (Model, req, res) => {
    const { email, username, password } = req.body
    try {
        const user = await Model.findOne({
            $or: [{ email }, { username }]
        })

        if (!user || !await verify(user.password, password)) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Usuario, correo o contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userData: {
                token,
                profilePicture: user.profilePicture ?? undefined
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        })
    }
}

export const loginClient = (req, res) => loginUser(Client, req, res)
export const loginAdmin = (req, res) => loginUser(Admin, req, res)
