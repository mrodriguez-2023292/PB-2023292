import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Proyecto Bimestral System API",
            version: "1.0.0",
            description: "API para gestionar usuarios",
            contact:{
                name: "Mario Rodriguez",
                email: "mrodriguez-2023292@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/DB-2023292/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/admin/*.js",
        "./src/client/*.js",
        "./src/category/*.js",
        "./src/product/*.js",
        "./src/shoppingCart/*.js",
        "./src/invoice/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }