import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: Number,
        validate: {
        validator: Number.isInteger,
        message: "product_id phải là số nguyên"
    },
        required: true
    },
    category_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: 'category_id phai la so nguyen'
        },
        required: true
    },
    supplier_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: 'supplier_id phai la so nguyen'
        },
        required: true
    },
    product_name: {
        type: String,
        maxlength: [150, 'Ten san pham khong qua 150 ky tu'],
        required: true
    },
    barcode: {
        type: String,
        maxlength: 50,
        required: true
    },
    unit: {
        type: String,
        maxlength: 30
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    cost_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)
export default Product;