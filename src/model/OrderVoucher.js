import mongoose from "mongoose";

const orderVoucherSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "order_id phải là số nguyên"
        },
        required: true
    },
    voucher_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "voucher_id phải là số nguyên"
        },
        required: true
    },
    discount_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

orderVoucherSchema.index(
    { order_id: 1, voucher_id: 1 },
    { unique: true }
);

const OrderVoucher = mongoose.model(
    "OrderVoucher",
    orderVoucherSchema
);

export default OrderVoucher;