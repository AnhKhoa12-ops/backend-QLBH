import PurchaseOrderDetail from "../model/PurchaseOrderDetail.js";
import Counter from "../model/Counter.js";

export const getAllPurchaseOrderDetail = async (req, res) => {
    try {
        const detail = await PurchaseOrderDetail.find().sort({po_detail_id: 1});
        res.json(detail);
    } catch (error) {
        console.error("Loi khi goi getAllPurchaseOrderDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdPurchaseOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.po_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_detail_id khong hop le"});
        const item = await PurchaseOrderDetail.findOne({po_detail_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdPurchaseOrderDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createPurchaseOrderDetail = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "po_detail_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new PurchaseOrderDetail({...req.body, po_detail_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createPurchaseOrderDetail:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updatePurchaseOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.po_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_detail_id khong hop le"});
        const data = {...req.body};
        delete data.po_detail_id; delete data._id;
        const update = await PurchaseOrderDetail.findOneAndUpdate(
            {po_detail_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updatePurchaseOrderDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deletePurchaseOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.po_detail_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_detail_id khong hop le"});
        const deleted = await PurchaseOrderDetail.findOneAndDelete({po_detail_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deletePurchaseOrderDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchPurchaseOrderDetail = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await PurchaseOrderDetail.find({po_id: {$regex: keyword.trim(), $options: "i"}}).sort({po_detail_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchPurchaseOrderDetail", error);
        res.status(500).json({message: "Server Error"});
    }
};
