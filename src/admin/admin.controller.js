"use strict"

import Admin from "./admin.model.js"
import Client from "../client/client.model.js"


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

        res.status(200).json({
            success: true,
            totalAdmins,
            totalClients,
            admins,
            clients
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: error.message
        })
    }
}
