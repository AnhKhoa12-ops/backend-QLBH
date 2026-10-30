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
import inventoryRouter from './route/inventoryRoute.js'
import orderRouter from './route/orderRoute.js'
import paymentRouter from './route/paymentRouter.js'
import orderDetailRouter from './route/orderDetailRouter.js'
import purchaseOrderRouter from './route/purchaseOrderRouter.js'
import detailRouter from './route/purchaseOrderDetailRouter.js'
import promotionRouter from './route/promotionRouter.js'
import promotionProductRouter from './route/promotionProductRouter.js'
import voucherRouter from './route/voucherRouter.js'
import orderVoucherRouter from './route/orderVoucherRouter.js'
import deliveryRouter from './route/deliveryRouter.js'
import returnDetailRouter from './route/returnDetailRouter.js'
import returnDataRouter from './route/returnRouter.js'

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
app.use('/inventory', inventoryRouter)
app.use('/order', orderRouter)
app.use("/order-details", orderDetailRouter);
app.use("/payments", paymentRouter);
app.use("/purchase-orders", purchaseOrderRouter);
app.use("/purchase-order-details", detailRouter);
app.use("/promotions", promotionRouter);
app.use("/promotion-products", promotionProductRouter);
app.use("/vouchers", voucherRouter);
app.use("/order-vouchers", orderVoucherRouter);
app.use("/deliveries", deliveryRouter);
app.use("/returns", returnDataRouter);
app.use("/return-details", returnDetailRouter);

