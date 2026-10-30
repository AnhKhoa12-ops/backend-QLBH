import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    payment_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "payment_id phải là số nguyên"
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
    payment_method: {
        type: String,
        maxlength: [50, "Phương thức thanh toán không quá 50 ký tự"],
        required: true
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    paid_at: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        maxlength: [30, "Trạng thái không quá 30 ký tự"],
        required: true
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;