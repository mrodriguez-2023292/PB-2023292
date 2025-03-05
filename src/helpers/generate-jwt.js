import jwt from "jsonwebtoken"

export const generateJWTA = (aid = " ") => {
    return new Promise((resolve, reject) => {
        const payload = { aid }

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) =>{
                if(err){
                    reject({
                        success: false,
                        message: err
                    })
                }else{
                    resolve(token)
                }
            }
        )
    })
}

export const generateJWTC = (cid = " ") => {
    return new Promise((resolve, reject) => {
        const payload = { cid }

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) =>{
                if(err){
                    reject({
                        success: false,
                        message: err
                    })
                }else{
                    resolve(token)
                }
            }
        )
    })
}