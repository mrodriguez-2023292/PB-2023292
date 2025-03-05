"use strict"

import { hash } from "argon2"
import Admin from "./admin.model.js"
import Client from "../client/client.model.js"

export const addUser = async (req, res) => {
    try {
        const { role, password, ...userData } = req.body
        let userDataWithHash = { ...userData }

        if (password) {
            userDataWithHash.password = await hash(password)
        }

        let user
        if (role === "ADMIN_ROLE") {
            user = await Admin.create(userDataWithHash)
        } else {
            user = await Client.create(userDataWithHash)
        }

        res.status(201).json({
            success: true,
            message: "Usuario creado con éxito",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al registrar el usuario",
            error: error.message
        })
    }
}

export const getUsers = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query
    const query = { status: true }

    try {
        const [admins, clients, totalAdmins, totalClients] = await Promise.all([
            Admin.find(query).skip(desde).limit(limite),
            Client.find(query).skip(desde).limit(limite),
            Admin.countDocuments(query),
            Client.countDocuments(query)
        ])

        const promotedClients = await Client.find({ role: "ADMIN_ROLE", status: true })
        const filteredClients = clients.filter(client => {
            return !promotedClients.find(promoted => promoted._id.toString() === client._id.toString())
        })
        
        const allAdmins = [...admins, ...promotedClients]

        res.status(200).json({
            success: true,
            totalAdmins: totalAdmins + promotedClients.length,
            totalClients: filteredClients.length,
            admins: allAdmins,
            clients: filteredClients
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: error.message
        })
    }
}

export const editRoleUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { role, password } = req.body

        let user = await Admin.findById(userId)

        if (!user) {
            user = await Client.findById(userId)
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (password) {
            user.password = await hash(password)
        }

        user.role = role
        const updatedUser = await user.save()

        res.status(200).json({
            success: true,
            message: "Rol actualizado correctamente",
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el rol",
            error: error.message
        })
    }
}


export const editUser = async (req, res) => {
    try {
        const { userId } = req.params
        const { password, ...userData } = req.body

        let user = await Admin.findById(userId)

        if (!user) {
            user = await Client.findById(userId)
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if (password) {
            userData.password = await hash(password)
        }

        const updatedUser = await (user.constructor === Admin
            ? Admin : Client
        ).findByIdAndUpdate(
            userId,
            { ...userData },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            user: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => { 
    try {
        const { userId } = req.params
        
        let user = await Admin.findById(userId)

        if(!user){
            user = await Client.findById(userId)
        }

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const deleteUser = await (user.constructor === Admin 
            ? Admin : Client
        ).findByIdAndUpdate(
            userId,
            { status: false },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente",
            user: deleteUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: error.message
        })
    }
}