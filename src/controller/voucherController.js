import Voucher from "../model/Voucher.js";
import Counter from "../model/Counter.js";

export const getAllVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.find().sort({voucher_id: 1});
        res.json(voucher);
    } catch (error) {
        console.error("Loi khi goi getAllVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdVoucher = async (req, res) => {
    try {
        const id = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "voucher_id khong hop le"});
        const item = await Voucher.findOne({voucher_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createVoucher = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "voucher_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new Voucher({...req.body, voucher_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createVoucher:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateVoucher = async (req, res) => {
    try {
        const id = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "voucher_id khong hop le"});
        const data = {...req.body};
        delete data.voucher_id; delete data._id;
        const update = await Voucher.findOneAndUpdate(
            {voucher_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updateVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteVoucher = async (req, res) => {
    try {
        const id = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "voucher_id khong hop le"});
        const deleted = await Voucher.findOneAndDelete({voucher_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deleteVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchVoucher = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await Voucher.find({code: {$regex: keyword.trim(), $options: "i"}}).sort({voucher_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};
