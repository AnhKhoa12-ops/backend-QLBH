import Promotion from "../model/Promotion.js";
import Counter from "../model/Counter.js";

export const getAllPromotion = async (req, res) => {
    try {
        const promotion = await Promotion.find().sort({promotion_id: 1});
        res.json(promotion);
    } catch (error) {
        console.error("Loi khi goi getAllPromotion", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdPromotion = async (req, res) => {
    try {
        const id = Number(req.params.promotion_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "promotion_id khong hop le"});
        const item = await Promotion.findOne({promotion_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdPromotion", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createPromotion = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "promotion_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new Promotion({...req.body, promotion_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createPromotion:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updatePromotion = async (req, res) => {
    try {
        const id = Number(req.params.promotion_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "promotion_id khong hop le"});
        const data = {...req.body};
        delete data.promotion_id; delete data._id;
        const update = await Promotion.findOneAndUpdate(
            {promotion_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updatePromotion", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deletePromotion = async (req, res) => {
    try {
        const id = Number(req.params.promotion_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "promotion_id khong hop le"});
        const deleted = await Promotion.findOneAndDelete({promotion_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deletePromotion", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchPromotion = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await Promotion.find({promotion_name: {$regex: keyword.trim(), $options: "i"}}).sort({promotion_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchPromotion", error);
        res.status(500).json({message: "Server Error"});
    }
};
