import express from "express";

import {
    getAllOrder,
    getByIdOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    searchOrder,
    updateOrderStatus,
    getOrdersByCustomer,
    getOrdersByStore
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrder);

orderRouter.get("/search", searchOrder);

orderRouter.get("/customer/:customer_id", getOrdersByCustomer);

orderRouter.get("/store/:store_id", getOrdersByStore);

orderRouter.get("/:order_id", getByIdOrder);

orderRouter.post("/", createOrder);

orderRouter.put("/:order_id", updateOrder);

orderRouter.patch("/:order_id/status", updateOrderStatus);

orderRouter.delete("/:order_id", deleteOrder);

export default orderRouter;