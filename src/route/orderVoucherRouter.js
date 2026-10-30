import express from "express";
import {
    getAllOrderVoucher, getByIdsOrderVoucher, createOrderVoucher, updateOrderVoucher, deleteOrderVoucher,
    getOrderVoucherByOrder_id, getOrderVoucherByVoucher_id
} from "../controller/orderVoucherController.js";

const orderVoucherRouter = express.Router();

orderVoucherRouter.get("/", getAllOrderVoucher);
orderVoucherRouter.get("/order_id/:order_id", getOrderVoucherByOrder_id);
orderVoucherRouter.get("/voucher_id/:voucher_id", getOrderVoucherByVoucher_id);
orderVoucherRouter.get("/:order_id/:voucher_id", getByIdsOrderVoucher);
orderVoucherRouter.post("/", createOrderVoucher);
orderVoucherRouter.put("/:order_id/:voucher_id", updateOrderVoucher);
orderVoucherRouter.delete("/:order_id/:voucher_id", deleteOrderVoucher);

export default orderVoucherRouter;
