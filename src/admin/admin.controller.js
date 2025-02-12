'use strict'

import Admin from './admin.model.js'
import Client from '../client/client.model.js'


export const getUsers = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const admin = await Admin.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const client = await Client.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

        const total_Admins = await Admin.countDocuments(query);

        const total_Clients = await Client.countDocuments(query);

        res.status(200).json({
            success: true,
            total_Admins,
            total_Clients,
            Admins: admin,
            Clients: client
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error
        });
    }
}
