import express from "express";

import {
    getAllOrderDetail,
    getByIdOrderDetail,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
    getOrderDetailsByOrder,
    getOrderDetailsByProduct
} from "../controller/orderDetailController.js";

const orderDetailRouter = express.Router();

orderDetailRouter.get("/", getAllOrderDetail);

orderDetailRouter.get("/order/:order_id", getOrderDetailsByOrder);

orderDetailRouter.get("/product/:product_id", getOrderDetailsByProduct);

orderDetailRouter.get("/:order_detail_id", getByIdOrderDetail);

orderDetailRouter.post("/", createOrderDetail);

orderDetailRouter.put("/:order_detail_id", updateOrderDetail);

orderDetailRouter.delete("/:order_detail_id", deleteOrderDetail);

export default orderDetailRouter;