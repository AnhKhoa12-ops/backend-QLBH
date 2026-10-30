import express from "express";
import {
    getAllDelivery,
    getByIdDelivery,
    createDelivery,
    updateDelivery,
    deleteDelivery,
    searchDelivery
} from "../controller/deliveryController.js";

const deliveryRouter = express.Router();

deliveryRouter.get("/", getAllDelivery);
deliveryRouter.get("/search", searchDelivery);
deliveryRouter.get("/:delivery_id", getByIdDelivery);
deliveryRouter.post("/", createDelivery);
deliveryRouter.put("/:delivery_id", updateDelivery);
deliveryRouter.delete("/:delivery_id", deleteDelivery);

export default deliveryRouter;
