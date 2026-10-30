import OrderVoucher from "../model/OrderVoucher.js";

export const getAllOrderVoucher = async (req, res) => {
    try {
        const data = await OrderVoucher.find().sort({order_id: 1, voucher_id: 1});
        res.json(data);
    } catch (error) {
        console.error("Loi khi goi getAllOrderVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getByIdsOrderVoucher = async (req, res) => {
    try {
        const first = Number(req.params.order_id);
        const second = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const data = await OrderVoucher.findOne({order_id: first, voucher_id: second});
        if (!data) return res.status(404).json({message: "Khong tim thay du lieu"});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getByIdsOrderVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const createOrderVoucher = async (req, res) => {
    try {
        const data = new OrderVoucher(req.body);
        const saved = await data.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Loi khi goi createOrderVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateOrderVoucher = async (req, res) => {
    try {
        const first = Number(req.params.order_id);
        const second = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const data = {...req.body};
        delete data.order_id; delete data.voucher_id; delete data._id;
        const updated = await OrderVoucher.findOneAndUpdate(
            {order_id: first, voucher_id: second}, {$set: data}, {new: true, runValidators: true}
        );
        if (!updated) return res.status(404).json({message: "Khong tim thay du lieu de cap nhat"});
        res.status(200).json(updated);
    } catch (error) {
        console.error("Loi khi goi updateOrderVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const deleteOrderVoucher = async (req, res) => {
    try {
        const first = Number(req.params.order_id);
        const second = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(first) || first <= 0 || !Number.isSafeInteger(second) || second <= 0)
            return res.status(400).json({message: "ID khong hop le"});
        const deleted = await OrderVoucher.findOneAndDelete({order_id: first, voucher_id: second});
        if (!deleted) return res.status(404).json({message: "Khong tim thay du lieu de xoa"});
        res.status(200).json({message: "Xoa du lieu thanh cong", data: deleted});
    } catch (error) {
        console.error("Loi khi goi deleteOrderVoucher", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getOrderVoucherByOrder_id = async (req, res) => {
    try {
        const id = Number(req.params.order_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "order_id khong hop le"});
        const data = await OrderVoucher.find({order_id: id});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getOrderVoucherByOrder_id", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getOrderVoucherByVoucher_id = async (req, res) => {
    try {
        const id = Number(req.params.voucher_id);
        if (!Number.isSafeInteger(id) || id <= 0) return res.status(400).json({message: "voucher_id khong hop le"});
        const data = await OrderVoucher.find({voucher_id: id});
        res.status(200).json(data);
    } catch (error) {
        console.error("Loi khi goi getOrderVoucherByVoucher_id", error);
        res.status(500).json({message: "Server Error"});
    }
};
