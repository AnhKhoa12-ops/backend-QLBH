import express from 'express'
import { createCategory, deleteCategory, getCategory, getCategoryById, searchCategory, updateCategory } from '../controller/categoryController.js'

const categoryRouter = express.Router()

categoryRouter.get('/', getCategory)

categoryRouter.get('/search', searchCategory)

categoryRouter.get('/:category_id', getCategoryById)

categoryRouter.post('/', createCategory)

categoryRouter.put('/:category_id', updateCategory)

categoryRouter.delete('/:category_id', deleteCategory)

export default categoryRouter;