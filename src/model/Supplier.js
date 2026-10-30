import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplier_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "supplier_id phải là số nguyên"
        },
        required: true
    },
    supplier_name: {
        type: String,
        maxlength: [150, "Tên nhà cung cấp không quá 150 ký tự"],
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
    tax_code: {
        type: String,
        maxlength: [30, "Mã số thuế không quá 30 ký tự"]
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;