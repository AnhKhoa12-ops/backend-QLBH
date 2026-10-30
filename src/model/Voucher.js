import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    voucher_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "voucher_id phải là số nguyên"
        },
        required: true
    },
    code: {
        type: String,
        maxlength: [50, "Mã voucher không quá 50 ký tự"],
        required: true
    },
    discount_type: {
        type: String,
        maxlength: [30, "Loại giảm giá không quá 30 ký tự"],
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
    },
    usage_limit: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "usage_limit phải là số nguyên"
        },
        required: true
    }
});

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;