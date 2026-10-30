import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    promotion_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "promotion_id phải là số nguyên"
        },
        required: true
    },
    promotion_name: {
        type: String,
        maxlength: [150, "Tên khuyến mãi không quá 150 ký tự"],
        required: true
    },
    promotion_type: {
        type: String,
        maxlength: [50, "Loại khuyến mãi không quá 50 ký tự"],
        required: true
    },
    discount_value: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    start_at: {
        type: Date,
        required: true
    },
    end_at: {
        type: Date,
        required: true
    }
});

const Promotion = mongoose.model("Promotion", promotionSchema);
export default Promotion;