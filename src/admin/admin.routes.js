import { Router } from "express"
import { addUser, getUsers, editRoleUser, editUser, deleteUser } from "./admin.controller.js"
import { addUserValidator, getUsersValidator, editRoleUserValidator, deleteUserValidator } from "../middlewares/users-validator.js"

const router = Router()

router.post(
    "/addUser",
    addUserValidator,
    addUser
)

router.get(
    "/getUsers",
    getUsersValidator,
    getUsers
)

router.patch(
    "/editRoleUser/:userId",
    editRoleUserValidator,
    editRoleUser
)

router.put(
    "/editUser/:userId",
    addUserValidator,
    editUser
)

router.delete(
    "/deleteUser/:userId",
    deleteUserValidator,
    deleteUser
)

export default router