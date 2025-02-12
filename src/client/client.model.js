import { Schema, model } from "mongoose";

const clientSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },

    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },

    username:{
        type: String,
        required: true,
        unique:true
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },

    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },

    password:{
        type: String,
        required: [true, "Password is required"]
    },

    profilePicture:{
        type: String
    },
    
    role:{
        type: String,
        required: true,
        default: "CLIENT_ROLE"
    },

    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

clientSchema.methods.toJSON = function(){
    const {password, _id, ...client} = this.toObject()
    client.uid = _id
    return client
}

export default model("Client", clientSchema)