import PurchaseOrder from "../model/PurchaseOrder.js";
import Counter from "../model/Counter.js";

export const getAllPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.find().sort({po_id: 1});
        res.json(purchaseOrder);
    } catch (error) {
        console.error("Loi khi goi getAllPurchaseOrder", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdPurchaseOrder = async (req, res) => {
    try {
        const id = Number(req.params.po_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_id khong hop le"});
        const item = await PurchaseOrder.findOne({po_id: id});
        if (!item) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(item);
    } catch (error) {
        console.error("Loi khi goi getByIdPurchaseOrder", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createPurchaseOrder = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            {_id: "po_id"}, {$inc: {seq: 1}}, {new: true, upsert: true}
        );
        const item = new PurchaseOrder({...req.body, po_id: counter.seq});
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Loi khi goi createPurchaseOrder:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updatePurchaseOrder = async (req, res) => {
    try {
        const id = Number(req.params.po_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_id khong hop le"});
        const data = {...req.body};
        delete data.po_id; delete data._id;
        const update = await PurchaseOrder.findOneAndUpdate(
            {po_id: id}, {$set: data}, {new: true, runValidators: true}
        );
        if (!update) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(update);
    } catch (error) {
        console.error("Loi khi goi updatePurchaseOrder", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deletePurchaseOrder = async (req, res) => {
    try {
        const id = Number(req.params.po_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "po_id khong hop le"});
        const deleted = await PurchaseOrder.findOneAndDelete({po_id: id});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deletePurchaseOrder", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchPurchaseOrder = async (req, res) => {
    try {
        const {keyword} = req.query;
        if (!keyword || !keyword.trim()) return res.status(400).json({message: "Vui long nhap tu khoa tim kiem"});
        const result = await PurchaseOrder.find({status: {$regex: keyword.trim(), $options: "i"}}).sort({po_id: 1});
        if (result.length === 0) return res.status(404).json({message: "Khong tim thay du lieu", data: []});
        res.status(200).json(result);
    } catch (error) {
        console.error("Loi khi goi searchPurchaseOrder", error);
        res.status(500).json({message: "Server Error"});
    }
};
