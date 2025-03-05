"use strict"

import Category from "./category.model.js"
import Product from "../product/product.model.js"

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

export const getCategories = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query
    const query = { status: true }

    try{
        const [categories, totalCategories] = await Promise.all([
            Category.find(query).skip(desde).limit(limite),
            Category.countDocuments(query)
        ])

        res.status(200).json({
            success: true,
            totalCategories,
            categories
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: error.message
        })
    }
}

export const editCategory = async (req, res) => {
    try{
        const { id } = req.params
        const { ...categoryData } = req.body
        
        const category = await Category.findById(id)

        if(!category){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrado"
            })
        }

        const newCategory = await Category.findByIdAndUpdate(
            id,
            { ...categoryData },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Categoria actualizada correctamente",
            newCategory
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al actualizar la categoria",
            error: error.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)
        if(!category){
            return res.status(404).json({ 
                success: false, 
                message: "Categoría no encontrada" 
            })
        }

        if(category.name === "Sin categoría"){
            return res.status(400).json({ 
                success: false,
                message: "No se puede eliminar la categoría por defecto" 
            })
        }

        const defaultCategory = await Category.findOne({ name: "Sin categoría" })
        if(!defaultCategory){
            return res.status(500).json({ 
                success: false, 
                message: "No se encontró la categoría por defecto" })
        }

        const products = await Product.find({ category: id })

        await Product.updateMany({ category: id }, { category: defaultCategory._id })

        if (products.length > 0) {
            const productsFormatted = products.map(prod => ({
                product: prod._id,
                name: prod.name,
                price: prod.price,
                stock: prod.stock
            }))

            await Category.findByIdAndUpdate(
                defaultCategory._id,
                { $push: { products: { $each: productsFormatted } } }
            )
        }

        await Category.findByIdAndDelete(id)

        res.status(200).json({ 
            success: true, 
            message: "Categoría eliminada con éxito" 
        })
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error al eliminar la categoría", 
            error: err.message 
        })
    }
}