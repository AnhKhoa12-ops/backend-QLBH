import Payment from "../model/Payment.js";
import Counter from "../model/Counter.js";

export const getAllPayment = async (req, res) => {
    try {
        const payment = await Payment.find().sort({payment_id: 'asc'});

        res.json(payment);
    } catch (error) {
        console.error('Loi khi goi getAllPayment', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getByIdPayment = async (req, res) => {
    try {
        const id = Number(req.params.payment_id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "payment_id khong hop le"
            });
        }

        const payment = await Payment.findOne({payment_id: id});

        if (!payment) {
            return res.status(404).json({
                message: 'Khong tim thay thanh toan'
            });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error('Loi khi goi getByIdPayment', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const createPayment = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "payment_id" },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true
            }
        );

        const payment = new Payment({
            ...req.body,
            payment_id: counter.seq
        });

        const newPayment = await payment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        console.error("Loi khi goi createPayment:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updatePayment = async (req, res) => {
    try {
        const id = Number(req.params.payment_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'payment_id khong hop le'
            });
        }

        const update = await Payment.findOneAndUpdate(
            {payment_id: id},
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if (!update) {
            return res.status(404).json({
                message: 'Khong tim thay thanh toan de cap nhat'
            });
        }

        res.status(200).json(update);
    } catch (error) {
        console.error('Loi khi goi updatePayment', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const deletePayment = async (req, res) => {
    try {
        const id = Number(req.params.payment_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "payment_id khong hop le"
            });
        }

        const deletePay = await Payment.findOneAndDelete({
            payment_id: id
        });

        if (!deletePay) {
            return res.status(404).json({
                message: "Khong tim thay thanh toan de xoa"
            });
        }

        res.status(200).json({
            message: "Xoa thanh toan thanh cong",
            payment: deletePay
        });
    } catch (error) {
        console.error("Loi khi goi deletePayment:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchPayment = async (req, res) => {
    try {
        const {keyword} = req.query;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                message: 'Vui long nhap tu khoa tim kiem'
            });
        }

        const payment = await Payment.find({
            payment_method: {
                $regex: keyword.trim(),
                $options: "i"
            }
        }).sort({payment_id: 1});

        if (payment.length === 0) {
            return res.status(404).json({
                message: 'Khong tim thay thanh toan',
                payment: []
            });
        }

        res.status(200).json({
            message: 'Tim thay thanh toan',
            payment
        });
    } catch (error) {
        console.error('Loi khi goi searchPayment', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const id = Number(req.params.payment_id);
        const {status} = req.body;

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'payment_id khong hop le'
            });
        }

        if (!status || !status.trim()) {
            return res.status(400).json({
                message: 'Vui long nhap trang thai thanh toan'
            });
        }

        const update = await Payment.findOneAndUpdate(
            {payment_id: id},
            {$set: {status: status.trim()}},
            {new: true, runValidators: true}
        );

        if (!update) {
            return res.status(404).json({
                message: 'Khong tim thay thanh toan'
            });
        }

        res.status(200).json({
            message: 'Cap nhat trang thai thanh toan thanh cong',
            payment: update
        });
    } catch (error) {
        console.error('Loi khi goi updatePaymentStatus', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getPaymentsByOrder = async (req, res) => {
    try {
        const id = Number(req.params.order_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'order_id khong hop le'
            });
        }

        const payment = await Payment.find({
            order_id: id
        }).sort({payment_id: 1});

        if (payment.length === 0) {
            return res.status(404).json({
                message: 'Don hang chua co thanh toan nao',
                payment: []
            });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error('Loi khi goi getPaymentsByOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};