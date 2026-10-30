import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    store_id: {
        type: Number,
        unique: true,
        required: true
    },
    store_name: {
        type: String,
        required: true,
        maxlength: 150
    },
    address: {
        type: String,
        maxlength: 255
    },
    phone: {
        type: String,
        maxlength: 20
    },
    status: {
        type: String,
        enum: ['close', 'open'],
        maxlength: 30,
        default: 'close'
    }
});

const Store = mongoose.model("Store", storeSchema);
export default Store;