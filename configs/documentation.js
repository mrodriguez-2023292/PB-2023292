import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Adoption System API",
            version:"1.0.0",
            description: "API para sistema de adopción de mascotas",
            contact:{
                name: "Braulio Echeverria",
                email: "braulioecheveria@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/adopptionSystem/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/pet/*.js",
        "./src/appointment/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }