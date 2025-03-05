"use strict"

import Client from "./client.model.js"
import Product from "../product/product.model.js"
import Category from "../category/category.model.js"

export const getProducts = async (req, res) => {
    const { limite = 10, desde = 0, nombre, categoria, ordenarPor = 'sales', orden = 'desc' } = req.query
    const query = { status: true }

    if(nombre){
        query.name = { $regex: nombre, $options: 'i' }
    }

    if(categoria){
        try {
            const category = await Category.findOne({ name: categoria })
            if (category) {
                query.category = category._id
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Categoría no encontrada"
                })
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error al buscar la categoría",
                error: error.message
            })
        }
    }

    const sortCriteria = ordenarPor === 'sales'
        ? { sales: orden === 'asc' ? 1 : -1 }
        : { name: orden === 'asc' ? 1 : -1 };

    try {
        const [products, totalProducts, soldOut, bestSellers] = await Promise.all([
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .sort(sortCriteria),
            Product.countDocuments(query),
            Product.find({ ...query, stock: 0 }),
            Product.find({ ...query, sales: { $gt: 0 } })
                .sort({ sales: -1 })
                .limit(5)
        ])

        res.status(200).json({
            success: true,
            totalProducts,
            products,
            soldOut,
            bestSellers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        })
    }
}
