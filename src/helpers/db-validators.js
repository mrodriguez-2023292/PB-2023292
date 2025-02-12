import Admin from "../admin/admin.model.js";
import Client from "../client/client.model.js";

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

export const adminExists = async (uid = " ") => {
    const exist = await Admin.findById(uid)
    if(!exist){
        throw new Error("No existe el admin con el ID proporcionado")
    }
}

export const clientExists = async (uid = "") => {
    const exist = await Client.findById(uid);
    if (!exist) {
        throw new Error("No existe el cliente con el ID proporcionado");
    }
};

