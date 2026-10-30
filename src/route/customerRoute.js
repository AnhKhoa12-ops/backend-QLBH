import express from 'express'
import { createCustomer, deleteCustomer, getCustomer, getCustomerByID, searchCustomer, updateCustomer, updateCustomerPoints } from '../controller/customerController.js'

const customerRouter = express.Router()

customerRouter.get('/', getCustomer)

customerRouter.get('/search', searchCustomer)

customerRouter.get('/:customer_id', getCustomerByID)

customerRouter.post('/', createCustomer)

customerRouter.put('/:customer_id', updateCustomer)

customerRouter.delete('/:customer_id', deleteCustomer)

customerRouter.patch('/:customer_id', updateCustomerPoints)

export default customerRouter;