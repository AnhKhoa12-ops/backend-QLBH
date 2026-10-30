import express from "express";
import {
    getAllPurchaseOrder,
    getByIdPurchaseOrder,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    searchPurchaseOrder
} from "../controller/purchaseOrderController.js";

const purchaseOrderRouter = express.Router();

purchaseOrderRouter.get("/", getAllPurchaseOrder);
purchaseOrderRouter.get("/search", searchPurchaseOrder);
purchaseOrderRouter.get("/:po_id", getByIdPurchaseOrder);
purchaseOrderRouter.post("/", createPurchaseOrder);
purchaseOrderRouter.put("/:po_id", updatePurchaseOrder);
purchaseOrderRouter.delete("/:po_id", deletePurchaseOrder);

export default purchaseOrderRouter;
