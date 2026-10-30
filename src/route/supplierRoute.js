import express from 'express'
import { createSupplier, deleteSupplier, getSupplier, getSupplierById, searchSupplier, updateSupplier } from '../controller/supplierController.js'

const supplierRouter = express.Router()

supplierRouter.get('/', getSupplier)

supplierRouter.get('/search', searchSupplier)

supplierRouter.get('/:supplier_id', getSupplierById)

supplierRouter.post('/', createSupplier)

supplierRouter.put('/:supplier_id', updateSupplier)

supplierRouter.delete('/:supplier_id', deleteSupplier)

export default supplierRouter;