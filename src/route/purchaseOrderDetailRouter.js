import express from "express";
import {
    getAllPurchaseOrderDetail,
    getByIdPurchaseOrderDetail,
    createPurchaseOrderDetail,
    updatePurchaseOrderDetail,
    deletePurchaseOrderDetail,
    searchPurchaseOrderDetail
} from "../controller/purchaseOrderDetailController.js";

const detailRouter = express.Router();

detailRouter.get("/", getAllPurchaseOrderDetail);
detailRouter.get("/search", searchPurchaseOrderDetail);
detailRouter.get("/:po_detail_id", getByIdPurchaseOrderDetail);
detailRouter.post("/", createPurchaseOrderDetail);
detailRouter.put("/:po_detail_id", updatePurchaseOrderDetail);
detailRouter.delete("/:po_detail_id", deletePurchaseOrderDetail);

export default detailRouter;
