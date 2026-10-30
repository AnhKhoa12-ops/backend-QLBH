import mongoose from "mongoose";

const purchaseOrderDetailSchema = new mongoose.Schema({
    po_detail_id: {
        type: Number,

        validate: {
            validator: Number.isInteger,
            message: "po_detail_id phải là số nguyên"
        },

        unique: true,

        required: true
    },
    po_id: {
        type: Number,

        validate: {
            validator: Number.isInteger,
            message: "po_id phải là số nguyên"
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
    unit_cost: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    subtotal: {
        type: mongoose.Schema.Types.Decimal128,

        required: true
    },
    unit_cost: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,

        required: true
    }
});


const PurchaseOrderDetail = mongoose.model(
    "PurchaseOrderDetail",
    purchaseOrderDetailSchema
);

export default PurchaseOrderDetail;