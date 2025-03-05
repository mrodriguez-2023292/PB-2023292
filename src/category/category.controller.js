"use strict"

import Category from "./category.model.js"

export const addCategory = async (req, res) => {
    try{
        const { ...categoryData } = req.body

        const category = await Category.create({
             ...categoryData
        })

        res.status(201).json({
            success: true,
            message: "Categoria agregado correctamente",
            category
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al guardar la categoria",
            error: error.message
        })
    }
}