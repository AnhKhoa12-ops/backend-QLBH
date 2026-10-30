import mongoose from "mongoose";

const purchaseOrderSchema = new mongoose.Schema({
    po_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "po_id phải là số nguyên"
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
    supplier_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "supplier_id phải là số nguyên"
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
    po_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        maxlength: [30, "Trạng thái không quá 30 ký tự"],
        required: true
    },
    total_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

const PurchaseOrder = mongoose.model(
    "PurchaseOrder",
    purchaseOrderSchema
);

export default PurchaseOrder;