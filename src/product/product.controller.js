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

export const getProductById = async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: err.message
        })
    }
}

export const getProducts = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query
    const query = { status: true }

    try{
        const [products, totalProducts, soldOut, bestSellers] = await Promise.all([
            Product.find(query).skip(desde).limit(limite),
            Product.countDocuments(query),
            Product.find({ stock: 0 }),
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
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        })
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        let { category, ...productData } = req.body

        const product = await Product.findById(id)
        const categoryExists = await Category.findById(category)

        if(!product){
            return res.status(404).json({ 
                success: false, 
                message: "Producto no encontrado" 
            })
        }else if(category){
            if(!categoryExists){
                return res.status(404).json({ 
                    success: false, 
                    message: "Categoría no encontrada" 
                })
            }else if(!product.category.equals(category)){
                await Category.findByIdAndUpdate(product.category, 
                    { $pull: { products: { product: product._id } } })
                await Category.findByIdAndUpdate(category,
                    { $push: { products: { product: product._id, name: product.name, price: product.price, stock: product.stock } } })
            }
        }else{
            category = product.category
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { ...productData, category }, { new: true })

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            })
        }

        const category = await Category.findById(product.category)

        if(category){
            await Category.findByIdAndUpdate(
                category._id,
                { $pull: { products: { product: product._id } } },
                { new: true }
            )
        }

        await Product.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: error.message
        })
    }
}

