import PromotionProduct from "../model/PromotionProduct.js";

export const getAllPromotionProduct = async (req, res) => {
    try {
        const data = await PromotionProduct.find().sort({promotion_id: 1, product_id: 1});
        res.json(data);
    } catch (error) {
        console.error("Loi khi goi getAllPromotionProduct", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdsPromotionProduct = async (req, res) => {
    try {
        const first = Number(req.params.promotion_id);
        const second = Number(req.params.product_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const data = await PromotionProduct.findOne({promotion_id: first, product_id: second});
        if (!data) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getByIdsPromotionProduct", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createPromotionProduct = async (req, res) => {
    try {
        const data = new PromotionProduct(req.body);
        const saved = await data.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Loi khi goi createPromotionProduct", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updatePromotionProduct = async (req, res) => {
    try {
        const first = Number(req.params.promotion_id);
        const second = Number(req.params.product_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const data = {...req.body};
        delete data.promotion_id; delete data.product_id; delete data._id;
        const updated = await PromotionProduct.findOneAndUpdate(
            {promotion_id: first, product_id: second}, {$set: data}, {new: true, runValidators: true}
        );
        if (!updated) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(updated);
    } catch (error) {
        console.error("Loi khi goi updatePromotionProduct", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deletePromotionProduct = async (req, res) => {
    try {
        const first = Number(req.params.promotion_id);
        const second = Number(req.params.product_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const deleted = await PromotionProduct.findOneAndDelete({promotion_id: first, product_id: second});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deletePromotionProduct", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getPromotionProductByPromotion_id = async (req, res) => {
    try {
        const id = Number(req.params.promotion_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "promotion_id khong hop le"});
        const data = await PromotionProduct.find({promotion_id: id});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getPromotionProductByPromotion_id", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getPromotionProductByProduct_id = async (req, res) => {
    try {
        const id = Number(req.params.product_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "product_id khong hop le"});
        const data = await PromotionProduct.find({product_id: id});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getPromotionProductByProduct_id", error);
        res.status(500).json({message: "Server Error"});
    }
};
