import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
    return_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "return_id phải là số nguyên"
        },
        required: true
    },
    order_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "order_id phải là số nguyên"
        },
        required: true
    },
    user_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "user_id phải là số nguyên"
        },
        required: true
    },
    return_date: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        maxlength: [255, "Lý do trả hàng không quá 255 ký tự"],
        required: true
    },
    refund_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

const Return = mongoose.model("Return", returnSchema);
export default Return;