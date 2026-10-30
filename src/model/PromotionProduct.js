import mongoose from "mongoose";

const promotionProductSchema = new mongoose.Schema({
    promotion_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "promotion_id phải là số nguyên"
        },
        required: true
    },
    product_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "product_id phải là số nguyên"
        },
        required: true
    },
    promo_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

promotionProductSchema.index(
    { promotion_id: 1, product_id: 1 },
    { unique: true }
);

const PromotionProduct = mongoose.model(
    "PromotionProduct",
    promotionProductSchema
);

export default PromotionProduct;