import express from "express";

import {
    getAllPayment,
    getByIdPayment,
    createPayment,
    updatePayment,
    deletePayment,
    searchPayment,
    updatePaymentStatus,
    getPaymentsByOrder
} from "../controller/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.get("/", getAllPayment);

paymentRouter.get("/search", searchPayment);

paymentRouter.get("/order/:order_id", getPaymentsByOrder);

paymentRouter.get("/:payment_id", getByIdPayment);

paymentRouter.post("/", createPayment);

paymentRouter.put("/:payment_id", updatePayment);

paymentRouter.patch("/:payment_id/status", updatePaymentStatus);

paymentRouter.delete("/:payment_id", deletePayment);

export default paymentRouter;