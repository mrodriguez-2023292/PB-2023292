"use strict"

import Product from "./product.model.js"
import Category from "../category/category.model.js"

export const addProduct = async (req, res) => {
    try{
        let { category, ...productData } = req.body

        const categoryExists = await Category.findById(category)

        if(!category){
            const defaultCategory = await Category.findOne({ name: "Sin categoría" })
            category = defaultCategory._id
        }else if(!categoryExists){
            return res.status(404).json({ 
                success: false, 
                message: "Categoria no encontrada"
            })
        }

        const product = await Product.create({
             ...productData, 
             category 
        })

        await Category.findByIdAndUpdate(
            category,
            { $push: { products: { product: product._id, name: product.name, price: product.price, stock: product.stock } } },
            { new: true }
        )

        res.status(201).json({
            success: true,
            message: "Producto agregado correctamente",
            product
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al guardar el producto",
            error: error.message
        })
    }
}