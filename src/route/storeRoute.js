import express from 'express'

import { createStore, deleteStore, getAllStore, getOneStore, searchStore, updateStore, updateStoreStatus } from '../controller/storeController.js';




const storeRouter = express.Router()

storeRouter.get('/', getAllStore)


storeRouter.get('/search', searchStore)


storeRouter.get('/:store_id', getOneStore)

storeRouter.post('/', createStore)


storeRouter.put('/:store_id', updateStore)

storeRouter.patch('/:store_id', updateStoreStatus)

storeRouter.delete('/:store_id', deleteStore)


export default storeRouter;