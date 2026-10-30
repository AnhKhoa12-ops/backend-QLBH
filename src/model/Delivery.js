import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    delivery_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "delivery_id phải là số nguyên"
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
    shipper_name: {
        type: String,
        maxlength: [100, "Tên người giao hàng không quá 100 ký tự"],
        required: true
    },
    phone: {
        type: String,
        maxlength: [20, "Số điện thoại không quá 20 ký tự"]
    },
    address: {
        type: String,
        maxlength: [255, "Địa chỉ không quá 255 ký tự"],
        required: true
    },
    shipping_fee: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    status: {
        type: String,
        maxlength: [30, "Trạng thái không quá 30 ký tự"],
        required: true
    }
});

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;