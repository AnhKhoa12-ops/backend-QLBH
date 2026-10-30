import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "category_id phải là số nguyên"
        },
        required: true
    },
    category_name: {
        type: String,
        maxlength: [100, "Tên danh mục không quá 100 ký tự"],
        required: true
    },
    description: {
        type: String
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;