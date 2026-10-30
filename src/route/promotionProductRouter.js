import express from "express";
import {
    getAllPromotionProduct, getByIdsPromotionProduct, createPromotionProduct, updatePromotionProduct, deletePromotionProduct,
    getPromotionProductByPromotion_id, getPromotionProductByProduct_id
} from "../controller/promotionProductController.js";

const promotionProductRouter = express.Router();

promotionProductRouter.get("/", getAllPromotionProduct);
promotionProductRouter.get("/promotion_id/:promotion_id", getPromotionProductByPromotion_id);
promotionProductRouter.get("/product_id/:product_id", getPromotionProductByProduct_id);
promotionProductRouter.get("/:promotion_id/:product_id", getByIdsPromotionProduct);
promotionProductRouter.post("/", createPromotionProduct);
promotionProductRouter.put("/:promotion_id/:product_id", updatePromotionProduct);
promotionProductRouter.delete("/:promotion_id/:product_id", deletePromotionProduct);

export default promotionProductRouter;
