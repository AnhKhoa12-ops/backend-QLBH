import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "role_id phải là số nguyên"
        },
        required: true
    },
    role_name: {
        type: String,
        maxlength: [50, "Tên vai trò không quá 50 ký tự"],
        required: true
    }
});

const Role = mongoose.model("Role", roleSchema);
export default Role;