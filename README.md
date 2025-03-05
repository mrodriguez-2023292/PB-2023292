# Proyecto Final de Programación

## Descripción
Este proyecto se centra en el desarrollo de una API web implementada en **NodeJS**, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa.

La aplicación se estructura en dos secciones principales:
- **Administrador**: Gestiona productos, ventas y usuarios.
- **Cliente**: Realiza compras y consulta productos.

## Tecnologías Utilizadas
- **NodeJS** con **Express.js** para la creación de la API.
- **MongoDB** o **MySQL** para la gestión de datos.
- **JWT** para la autenticación y autorización de usuarios.
- **argon2** para el manejo seguro de contraseñas.
- **Swagger** para documentación de la API.

## Instalación
1. Clona el repositorio:

   ```bash
   git clone https://github.com/mrodriguez-2023292/PB-2023292.git
   ```

2. Instala las dependencias:

   ```bash
   cd PB-2023292
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`.
4. Inicia el servidor:

   ```bash
   npm start
   ```

## Cómo iniciar el proyecto

Como primer paso, el usuario o la persona que va a usar el programa tendrá que copiar el link del repositorio, el cual es el siguiente:

[https://github.com/mrodriguez-2023292/PB-2023292.git](https://github.com/mrodriguez-2023292/PB-2023292.git)

Ahora que se haya creado una carpeta con el nombre del repositorio, en esa carpeta que se creó se abre el **cmd** y en el **cmd** se hace lo siguiente:

![image](https://github.com/user-attachments/assets/bd3e11dd-01d1-49c4-bc07-ec87109fdd5f)

![image](https://github.com/user-attachments/assets/782e7597-cb40-4479-9f84-d0f36cc8bf6f)

![image](https://github.com/user-attachments/assets/dc75f640-364f-4615-ae2c-55558b32d8f5)

1. Una vez clonado el repositorio, abre una terminal en la carpeta creada y ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm i
   ```

2. Para iniciar el proyecto en modo desarrollo, usa el siguiente comando:

   ```bash
   npm run dev
   ```

3. La ruta base para las peticiones es:

   ```
   http://127.0.0.1:3000/storeSystem/v1/
   ```

   Después de la última `/`, se pueden agregar diferentes rutas y métodos según las funcionalidades requeridas.

## Endpoints

## Carpeta Auth

### - Registar Clientes

| Método | Endpoint            | Descripción           |
|---------|---------------------|-------------------------|
| POST    | /auth/registerClient | Registro del cliente    |

**Ejemplo:**
```json
{
    "name": "Luis",
    "surname": "Perez",
    "username": "luisperez",
    "email": "luis.perez@example.com",
    "phone": "56473829",
    "password": "Lui$7890"
}
```

### - Login del Clientes

| Método | Endpoint          | Descripción         |
|---------|-----------------|---------------------|
| POST    | /auth/loginClient | Login del cliente  |

**Ejemplo:**
```json
{
    "username": "luisperez",
    "password": "Lui$7890"
}
```

### - Login del Admin

| Método | Endpoint         | Descripción      |
|---------|----------------|----------------|
| POST    | /auth/loginAdmin | Login del admin |

El usuario administrador se crea automáticamente al iniciar el proyecto. Sus credenciales por defecto son:

| **Nombre** | **Apellido** | **Username**   | **Email**               | **Teléfono** | **Contraseña**   |
|------------|--------------|---------------|--------------------------|--------------|------------------|
| Admin      | Principal    | admin_master  | admin@example.com       | 12345678     | Dm@n1234         |

### Datos de Clientes

El proyecto incluye los siguientes datos de clientes para pruebas:

| **Nombre** | **Apellido** | **Username**   | **Email**                    | **Teléfono** | **Contraseña**   |
|------------|--------------|---------------|------------------------------|--------------|------------------|
| Luis       | Perez        | luisperez     | luis.perez@example.com       | 56473829     | Lui$7890         |
| Carlos     | Gomez        | carlosgomez   | carlos.gomez@example.com     | 75395142     | Carlos1234!      |
| Ana        | Lopez        | analopez      | ana.lopez@example.com        | 87456239     | Ana@2023         |
| Javier     | Martinez     | javiermartinez| javier.martinez@example.com  | 12345678     | Javi#9876        |
| María      | Fernández    | mariafdez     | maria.fernandez@example.com  | 98765432     | Maria_2024       |
| Roberto    | Hernandez    | roberthernandez| roberto.hernandez@example.com| 11223344     | R0b3rto!56       |
| Sofia      | Perez        | sofiaperez    | sofia.perez@example.com      | 55667788     | Sofía123#        |
| David      | Ruiz         | davidruiz     | david.ruiz@example.com       | 99887766     | D@vid2023        |
| Lucia      | Sanchez      | luciasanchez  | lucia.sanchez@example.com    | 66554433     | Luci@2019        |
| Pedro      | Diaz         | pedrodiac     | pedro.diaz@example.com       | 44556677     | P3dro_987        |
| Laura      | Martínez     | lauramartinez | laura.martinez@example.com   | 22334455     | L@ura1234        |

---

## Carpeta Admins

### Autenticación para Admin

Para acceder a los endpoints de administración, se requiere autenticación mediante token, obtenido al iniciar sesión como admin:

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /auth/loginAdmin     | Login del admin |

**Resultado:**
```json
{
    "message": "Inicio de sesión exitoso",
    "userData": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2N2M3ZDY2MGU1ZTE3MGJmYWVmZmU3ODQiLCJpYXQiOjE3NDE0ODg3OTcsImV4cCI6MTc0MTQ5MjM5N30.GWu3TOzdgI7p5q-0_aCWlYSIM7qQHDw-Ne9fri_Norw"
    }
}
```

Este token debe incluirse en los encabezados de las solicitudes a los endpoints restringidos para administradores.

![image](https://github.com/user-attachments/assets/64839012-62f3-4f79-bd9c-944cf33109b2)

## - Usuarios

### - Agregar Usuarios

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /admin/addUser | Agregar un usuario (cliente) |

**Ejemplo:**
```json
{
    "name": "Carlos",
    "surname": "Gomez",
    "username": "carlosgomez",
    "email": "carlos.gomez@example.com",
    "phone": "12345678",
    "password": "passWo#d123"
}
```
### - Listado de Usuarios

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| GET    | /admin/getUsers | Listar todos los usuarios existentes del programa |

### - Modificación del Role de Usuarios

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| PATCH  | /admin/editRoleUser/:cid | Cambiar el rol de un usuario a ADMIN_ROLE |

**Ejemplo:**
```json
{
    "role": "ADMIN_ROLE"
}
```

### - Modificación de Usuarios

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| PUT    | /admin/editUser/:cid     | Editar la información de un usuario |

**Ejemplo:**
```json
{
    "name": "nuevos nombres",
    "surname": "nuevos apellidos",
    "username": "nuevo nombre de usuario",
    "email": "nuevo correo",
    "phone": "nuevo numero",
    "password": "passWo#d123"
}
```

### - Eliminación de Usuarios

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| DELETE  | /admin/deleteUser/:cid | Eliminar un usuario |

---

## - Categorías

### - Agregar Categorias

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /category/addCategory  | Agregar una categoría |

**Ejemplo:**
```json
{
    "name": "Artículos para el hogar"
}
```

### - Listado de Categorias

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| GET     | /category/getCategories | Listar todas las categorías |

### - Modificación de Categorias

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| PUT     | /category/editCategory/:id | Editar una categoría |

**Ejemplo:**
```json
{
    "name": "Plomería",
    "description": "En esta categoría solo se encontrarán cosas de plomería"
}
```
### - Eliminación de Categorias

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| DELETE  | /category/deleteCategory/:id | Eliminar una categoría |

---

## - Productos

### - Agregar Productos

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /product/addProduct    | Agregar un producto |

**Ejemplo:**
```json
{
    "name": "Laptop HP",
    "description": "Laptop con procesador Intel Core i7, 16GB RAM, 512GB SSD",
    "price": 1200.99,
    "stock": 50,
    "category": "Electrónica"
}
```

### - Listado de productos

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| GET     | /product/getProducts   | Listar todos los productos |

### - Modificación de Productos

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| PUT     | /product/editProduct/:id | Editar un producto |

**Ejemplo:**
```json
{
    "name": "Laptop HP ProBook",
    "description": "Modelo actualizado con mejor rendimiento",
    "price": 1300.99,
    "stock": 40,
    "category": "Electrónica"
}
```

### - Eliminación de Productos

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| DELETE  | /product/deleteProduct/:id | Eliminar un producto |

---

## Carpeta Clients

### - Listado de Productos para los Clientes

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| GET    | /client/productExploration    | Ver todos los productos |

Aquí no solo se listan los productos de forma normal si no que se pueden buscar por el nombre del producto y por categoria:

![image](https://github.com/user-attachments/assets/7d285643-60d7-4bca-808d-be7b4520b3c6)

### - Añadir carrito para el Cliente

#### Autenticación para Cliente

Para comenzar comprando cosas se tiene que conseguir un carrito pero para eso se requiere la autenticación del cliente mediante token, obtenido al iniciar sesión:

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /auth/loginClient     | Login de los clientes |

**Resultado:**
```json
{
    "message": "Inicio de sesión exitoso",
    "userData": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI2N2NkMDY1ZWMzZTNkMjBjYTI0ZDJhNmEiLCJpYXQiOjE3NDE0OTAzMjEsImV4cCI6MTc0MTQ5MzkyMX0.OGEzTuGuvf6WTSldGNPyqRLusuJvD5Qn-1x0zEUakJY"
    }
}
```

Este token debe incluirse en los encabezados de las solicitudes a los endpoints al igual que los admins para tener cierta seguridad en el programa. Este token iria en todas las solicitudes de Client, aclaro.

![image](https://github.com/user-attachments/assets/17806c0a-be6d-43d1-b8b9-bb5a66174a7c)

Y ahora si se puede agregar un carrito con el token del cliente:

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /shoppingCart/addCart     | Agregar carrito |

### - Añadir productos al carrito del Cliente

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /shoppingCart/addProduct/:id(id del carrito)     | Agregar productos al carrito |

**Ejemplo:**
```json
{
  "product": "id(se coloca el id del producto que se desea agregar)",
  "name": "nombre del producto que quiere agregar",
  "price": Su precio,
  "quantity": La cantidad que se quiere llevar de ese producto
}
```

### - Generar factura del Client

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| POST    | /invoice/generateInvoice/:id(id del carrito)     | Genera una factura de todo el carrito en pdf |

El PDF se guarda aquí:

![image](https://github.com/user-attachments/assets/6b7bf0ed-e5e4-47ff-9c07-d68a1095b986)

### - Historial del cliente

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| GET    | /client/clientHistory  | Lista todas las facturas del cliente |

Aquí se obtiene el historial del cliente mediante el token del cliente.

![image](https://github.com/user-attachments/assets/d8bf937c-cf42-4c01-aa35-44974639d834)

### - Editar perfil del Cliente

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| PUT    | /client/editProfile  | Modificación del cliente |

**Ejemplo:**
```json
{
    "name": "Carlos",
    "surname": "Martinez",
    "username": "carlosm23",
    "email": "carlos.martinez@example.com",
    "phone": "12345678"
}
```

Aquí de igual manera que en el apartado anterior se necesita el token del cliente para la modificación de su usuario.

### - Eliminar cuenta

| Método | Endpoint               | Descripción |
|---------|------------------------|-------------|
| DELETE    | /client/deleteAccount  | Eliminación de la cuenta |

Aquí de igual manera que en el apartado anterior se necesita el token del cliente para la eliminación de su usuario.

## Licencia
Este proyecto está bajo la licencia MIT. Para más detalles, revisa el archivo LICENSE en el repositorio.

