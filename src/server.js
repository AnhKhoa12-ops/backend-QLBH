import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './route/productRoute.js'
import userRouter from './route/userRoute.js'
import storeRouter from './route/storeRoute.js'
import categoryRouter from './route/categoryRoute.js'
import supplierRouter from './route/supplierRoute.js'
import roleRouter from './route/roleRoute.js'
import customerRouter from './route/customerRoute.js'

dotenv.config()

const PORT = process.env.PORT || 1212

const app = express()

connectDB().then(()=> {
    app.listen(PORT, () => {
    console.log('Server running in 1212')
})
})

app.use(express.json())
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/store', storeRouter)
app.use('/category', categoryRouter)
app.use('/supplier', supplierRouter)
app.use('/role', roleRouter)
app.use('/customer', customerRouter)


