import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    inventory_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "inventory_id phải là số nguyên"
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
    min_quantity: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "min_quantity phải là số nguyên"
        },
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;