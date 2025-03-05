import Admin from "../admin/admin.model.js"
import Client from "../client/client.model.js"
import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

export const emailExistsAdmin = async (email = "") => {
    const exist = await Admin.findOne({email})
    if(exist){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExistsAdmin = async (username = "") => {
    const exist = await Admin.findOne({username})
    if(exist){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const emailExistsClient = async (email = "") => {
    const exist = await Client.findOne({email})
    if(exist){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExistsClient = async (username = "") => {
    const exist = await Client.findOne({username})
    if(exist){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const adminExists = async (aid = " ") => {
    const exist = await Admin.findById(aid)
    if(!exist){
        throw new Error("No existe el admin con el ID proporcionado")
    }
}

export const clientExists = async (cid = "") => {
    const exist = await Client.findById(cid)
    if (!exist) {
        throw new Error("No existe el cliente con el ID proporcionado")
    }
}

export const categoryNameExists = async (name = "") => {
    const exist = await Category.findOne({name})
    if(exist){
        throw new Error(`The category ${name} is already registered`)
    }
}

export const categoryExists = async (id = "") => {
    const exist = await Category.findById(id)
    if(!exist){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}

export const productNameExists = async (name = "") => {
    const exist = await Product.findOne({name})
    if(exist){
        throw new Error(`The product ${name} is already registered`)
    }
}

export const productExists = async (id = "") => {
    const exist = await Product.findById(id)
    if(!exist){
        throw new Error("No existe el cliente con el ID proporcionado")
    }
}

