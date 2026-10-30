import express from 'express'
import { createInventory, getInventory, getInventoryById, getInventoryByProduct, getInventoryByStore, getLowStockProducts, updateInventory } from '../controller/inventoryController.js'


const inventoryRouter = express.Router()

inventoryRouter.get('/', getInventory)

inventoryRouter.get('/lowstock', getLowStockProducts)

inventoryRouter.get('/:inventory_id', getInventoryById)

inventoryRouter.get('/store/:store_id', getInventoryByStore)

inventoryRouter.get('/product/:product_id', getInventoryByProduct)



inventoryRouter.post('/', createInventory)

inventoryRouter.put('/:inventory_id', updateInventory)

export default inventoryRouter;