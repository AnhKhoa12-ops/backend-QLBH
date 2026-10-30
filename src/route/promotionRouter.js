import express from "express";
import {
    getAllPromotion,
    getByIdPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion,
    searchPromotion
} from "../controller/promotionController.js";

const promotionRouter = express.Router();

promotionRouter.get("/", getAllPromotion);
promotionRouter.get("/search", searchPromotion);
promotionRouter.get("/:promotion_id", getByIdPromotion);
promotionRouter.post("/", createPromotion);
promotionRouter.put("/:promotion_id", updatePromotion);
promotionRouter.delete("/:promotion_id", deletePromotion);

export default promotionRouter;
