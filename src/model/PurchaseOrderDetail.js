import mongoose from "mongoose";

const purchaseOrderDetailSchema = new mongoose.Schema({
    po_detail_id: {
        type: Number,
        unique: true,
        required: true
    },
    po_id: {
        type: Number,
        required: true
    },
    product_id: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
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

const PurchaseOrderDetail = mongoose.model("PurchaseOrderDetail", purchaseOrderDetailSchema);
export default PurchaseOrderDetail;