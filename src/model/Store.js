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
<<<<<<< HEAD
        enum: ['close', 'open'],
        maxlength: 30,
        default: 'close'
=======
        maxlength: 30
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
    }
});

const Store = mongoose.model("Store", storeSchema);
export default Store;