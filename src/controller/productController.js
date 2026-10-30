import Product from "../model/Product.js";
import Counter from "../model/Counter.js";

export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find().sort({product_id: 'asc'})
        res.json(product)
    } catch (error) {
        console.error('Loi khi goi getAllProduct', error)
        res.status(500).json({message: 'Server Error'})
    }
}

export const getByIdProduct = async (req, res) => {
    try {
        const id = Number(req.params.product_id);

       if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "product_id khong hop le"
            });
        }
        
        const product = await Product.findOne({product_id: id})
        if(!product) {
            return res.status(404).json({message: 'Khong tim thay san pham'})
        }       
        res.status(200).json(product)
    } catch (error) {
        console.error('Loi khi goi getByIdProduct', error)
        res.status(500).json({message: 'Server error'})
    }
}

export const createProduct = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "product_id" },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true
            }
        );

        const product = new Product({
            ...req.body,
            product_id: counter.seq
        });

        const newProduct = await product.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Loi khi goi createProduct:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.product_id);

        if(!Number.isSafeInteger(id) || id <= 0) {
            return res.status(404).json({message: 'KHong tim thay ID'})
        }

        const update = await Product.findOneAndUpdate(
            {product_id: id},
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if(!update) {
            return res.status(404).json({message: 'Khong co update'})
        }
        res.status(200).json(update)
    } catch (error) {
        console.error('Loi khi goi createProduct', error)
        res.status(500).json({message: 'Server error'})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.product_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "product_id khong hop le"
            });
        }

        const deleteProd = await Product.findOneAndDelete({
            product_id: id
        });

        if (!deleteProd) {
            return res.status(404).json({
                message: "Khong tim thay san pham de xoa"
            });
        }

        res.status(200).json({
            message: "Xoa san pham thanh cong",
            product: deleteProd
        });
    } catch (error) {
        console.error("Loi khi goi deleteProduct:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const searchProduct = async (req, res) => {
    try {
        const {keyword} = req.query

        if(!keyword || !keyword.trim()) {
            return res.json({message: 'Vui long nhap tu khoa tim kiem'})
        }

        const product = await Product.find({
            product_name: {
                $regex: keyword.trim(),
                $options: "i"
            }
        }).sort({product_id: 1})

        if(product.length === 0 ) {
            return res.json({message: 'Khong tim thay san pham', product: []})
        }

        res.json({message: 'Tim thay san pham pham',  product})

    } catch (error) {
        console.error('Loi khi goi searchProduct', error)
        res.json({message: 'Server Error'})
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const id = Number(req.params.category_id)

        if(!Number.isInteger(id) || id <= 0) {
            return res.json({message: 'ID khong hop le'})
        }

        const product = await Product.find({category_id: id})
        if(!product) {
            return res.json({message: 'Khong tim thay san pham'})
        }
        res.json(product)
    } catch (error) {
        console.error('Loi khi goi getProductsByCategory', error)
        res.json({message: 'Server Error'})
    }
}

export const getProductsBySupplier = async (req, res) => {
    try {
        const id = Number(req.params.supplier_id)

        const product = await Product.find({supplier_id: id})

        if(!product) {
            return res.json({message: 'Khong tim thay san pham'})
        }
        res.json(product)
    } catch (error) {
        console.error('Loi khi goi getProductsBySupplier', error)
        res.json({message: 'Server Error'})
    }
}