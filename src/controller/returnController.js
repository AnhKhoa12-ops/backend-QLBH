import Return from "../model/Return.js";
import Counter from "../model/Counter.js";

export const getAllReturn = async (req, res) => {
    try {
        const returnData = await Return.find().sort({return_id: 1});
        res.json(returnData);
    } catch (error) {
        console.error("Loi khi goi getAllReturn", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdReturn = async (req, res) => {
    try {
        const id = Number(req.params.return_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_id khong hop le"});
        const item = await Return.findOne({return_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdReturn", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createReturn = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "return_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new Return({...req.body, return_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createReturn:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateReturn = async (req, res) => {
    try {
        const id = Number(req.params.return_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_id khong hop le"});
        const data = {...req.body};
        delete data.return_id; delete data._id;
        const update = await Return.findOneAndUpdate(
            {return_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updateReturn", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteReturn = async (req, res) => {
    try {
        const id = Number(req.params.return_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_id khong hop le"});
        const deleted = await Return.findOneAndDelete({return_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deleteReturn", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchReturn = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await Return.find({order_id: {$regex: keyword.trim(), $options: "i"}}).sort({return_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchReturn", error);
        res.status(500).json({message: "Server Error"});
    }
};
