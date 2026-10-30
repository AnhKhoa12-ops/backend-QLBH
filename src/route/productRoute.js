import express from 'express'
<<<<<<< HEAD
import { createProduct, deleteProduct, getAllProduct, getByIdProduct, getProductsByCategory, getProductsBySupplier, searchProduct, updateProduct } from '../controller/productController.js'
=======
import { createProduct, deleteProduct, getAllProduct, getByIdProduct, updateProduct } from '../controller/productController.js'
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271

const productRouter = express.Router()

productRouter.get('/', getAllProduct)

<<<<<<< HEAD
productRouter.get('/search', searchProduct)

productRouter.get('/category/:category_id', getProductsByCategory)

productRouter.get('/supplier/:supplier_id', getProductsBySupplier)


productRouter.get('/:product_id', getByIdProduct)

productRouter.post('/', createProduct)

productRouter.put('/:product_id', updateProduct)

productRouter.delete('/:product_id', deleteProduct)

export default productRouter;