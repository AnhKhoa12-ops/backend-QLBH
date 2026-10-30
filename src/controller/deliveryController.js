import Delivery from "../model/Delivery.js";
import Counter from "../model/Counter.js";

export const getAllDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.find().sort({delivery_id: 1});
        res.json(delivery);
    } catch (error) {
        console.error("Loi khi goi getAllDelivery", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdDelivery = async (req, res) => {
    try {
        const id = Number(req.params.delivery_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "delivery_id khong hop le"});
        const item = await Delivery.findOne({delivery_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdDelivery", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createDelivery = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "delivery_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new Delivery({...req.body, delivery_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createDelivery:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateDelivery = async (req, res) => {
    try {
        const id = Number(req.params.delivery_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "delivery_id khong hop le"});
        const data = {...req.body};
        delete data.delivery_id; delete data._id;
        const update = await Delivery.findOneAndUpdate(
            {delivery_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updateDelivery", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteDelivery = async (req, res) => {
    try {
        const id = Number(req.params.delivery_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "delivery_id khong hop le"});
        const deleted = await Delivery.findOneAndDelete({delivery_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deleteDelivery", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchDelivery = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await Delivery.find({order_id: {$regex: keyword.trim(), $options: "i"}}).sort({delivery_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchDelivery", error);
        res.status(500).json({message: "Server Error"});
    }
};
