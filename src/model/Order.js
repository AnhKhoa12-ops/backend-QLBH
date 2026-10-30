import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "order_id phải là số nguyên"
        },
        required: true
    },
    store_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "store_id phải là số nguyên"
        },
        required: true
    },
    customer_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "customer_id phải là số nguyên"
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
    order_date: {
        type: Date,
        required: true
    },
    total_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    status: {
        type: String,
        maxlength: [30, "Trạng thái không quá 30 ký tự"],
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;