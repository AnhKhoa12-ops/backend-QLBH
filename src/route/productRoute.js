import express from 'express'

import { createProduct, deleteProduct, getAllProduct, getByIdProduct, getProductsByCategory, getProductsBySupplier, searchProduct, updateProduct } from '../controller/productController.js'



const productRouter = express.Router()

productRouter.get('/', getAllProduct)


productRouter.get('/search', searchProduct)

productRouter.get('/category/:category_id', getProductsByCategory)

productRouter.get('/supplier/:supplier_id', getProductsBySupplier)


productRouter.get('/:product_id', getByIdProduct)

productRouter.post('/', createProduct)

productRouter.put('/:product_id', updateProduct)

productRouter.delete('/:product_id', deleteProduct)

export default productRouter;