import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
    order_detail_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "order_detail_id phải là số nguyên"
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
    unit_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    discount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    subtotal: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
export default OrderDetail;