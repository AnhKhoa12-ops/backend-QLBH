import mongoose from "mongoose";

const returnDetailSchema = new mongoose.Schema({
    return_detail_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "return_detail_id phải là số nguyên"
        },
        required: true
    },
    return_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "return_id phải là số nguyên"
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
    quantity: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "quantity phải là số nguyên"
        },
        required: true
    },
    refund_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

const ReturnDetail = mongoose.model(
    "ReturnDetail",
    returnDetailSchema
);

export default ReturnDetail;