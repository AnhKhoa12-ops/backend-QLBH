import express from 'express'
import { createStore, getAllStore, getOneStore } from '../controller/storeController.js';

const storeRouter = express.Router()

storeRouter.get('/', getAllStore)

storeRouter.get('/:store_id', getOneStore)

storeRouter.post('/', createStore)

export default storeRouter;