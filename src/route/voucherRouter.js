import express from "express";
import {
    getAllVoucher,
    getByIdVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    searchVoucher
} from "../controller/voucherController.js";

const voucherRouter = express.Router();

voucherRouter.get("/", getAllVoucher);
voucherRouter.get("/search", searchVoucher);
voucherRouter.get("/:voucher_id", getByIdVoucher);
voucherRouter.post("/", createVoucher);
voucherRouter.put("/:voucher_id", updateVoucher);
voucherRouter.delete("/:voucher_id", deleteVoucher);

export default voucherRouter;
