import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customer_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "customer_id phải là số nguyên"
        },
        required: true
    },
    name: {
        type: String,
        maxlength: [100, "Tên khách hàng không quá 100 ký tự"],
        required: true
    },
    phone: {
        type: String,
        maxlength: [20, "Số điện thoại không quá 20 ký tự"]
    },
    address: {
        type: String,
        maxlength: [255, "Địa chỉ không quá 255 ký tự"]
    },
    email: {
        type: String,
        maxlength: [100, "Email không quá 100 ký tự"]
    },
    points: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "points phải là số nguyên"
        },
        required: true
    }
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;