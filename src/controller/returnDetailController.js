import ReturnDetail from "../model/ReturnDetail.js";
import Counter from "../model/Counter.js";

export const getAllReturnDetail = async (req, res) => {
    try {
        const returnDetail = await ReturnDetail.find().sort({return_detail_id: 1});
        res.json(returnDetail);
    } catch (error) {
        console.error("Loi khi goi getAllReturnDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdReturnDetail = async (req, res) => {
    try {
        const id = Number(req.params.return_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_detail_id khong hop le"});
        const item = await ReturnDetail.findOne({return_detail_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdReturnDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createReturnDetail = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "return_detail_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new ReturnDetail({...req.body, return_detail_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createReturnDetail:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateReturnDetail = async (req, res) => {
    try {
        const id = Number(req.params.return_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_detail_id khong hop le"});
        const data = {...req.body};
        delete data.return_detail_id; delete data._id;
        const update = await ReturnDetail.findOneAndUpdate(
            {return_detail_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updateReturnDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteReturnDetail = async (req, res) => {
    try {
        const id = Number(req.params.return_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "return_detail_id khong hop le"});
        const deleted = await ReturnDetail.findOneAndDelete({return_detail_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deleteReturnDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchReturnDetail = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await ReturnDetail.find({return_id: {$regex: keyword.trim(), $options: "i"}}).sort({return_detail_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchReturnDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};
