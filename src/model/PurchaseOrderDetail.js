import mongoose from "mongoose";

const purchaseOrderDetailSchema = new mongoose.Schema({
    po_detail_id: {
        type: Number,
<<<<<<< HEAD
        validate: {
            validator: Number.isInteger,
            message: "po_detail_id phải là số nguyên"
        },
=======
        unique: true,
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
        required: true
    },
    po_id: {
        type: Number,
<<<<<<< HEAD
        validate: {
            validator: Number.isInteger,
            message: "po_id phải là số nguyên"
        },
=======
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
        required: true
    },
    product_id: {
        type: Number,
<<<<<<< HEAD
        validate: {
            validator: Number.isInteger,
            message: "product_id phải là số nguyên"
        },
=======
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
        required: true
    },
    quantity: {
        type: Number,
<<<<<<< HEAD
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
=======
        required: true
    },
    unit_cost: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
        required: true
    }
});

<<<<<<< HEAD
const PurchaseOrderDetail = mongoose.model(
    "PurchaseOrderDetail",
    purchaseOrderDetailSchema
);

=======
const PurchaseOrderDetail = mongoose.model("PurchaseOrderDetail", purchaseOrderDetailSchema);
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
export default PurchaseOrderDetail;