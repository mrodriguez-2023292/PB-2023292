import { Router } from "express"
import { addCategory, getCategories, editCategory, deleteCategory } from "./category.controller.js"
import { addCategoryValidator, getCategoriesValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/categories-validator.js"

const router = Router()

router.post(
    "/addCategory", 
    addCategoryValidator, 
    addCategory
)

router.get(
    "/getCategories", 
    getCategoriesValidator, 
    getCategories
)

router.put(
    "/editCategory/:id", 
    editCategoryValidator, 
    editCategory
)

router.delete(
    "/deleteCategory/:id", 
    deleteCategoryValidator, 
    deleteCategory
)

export default router