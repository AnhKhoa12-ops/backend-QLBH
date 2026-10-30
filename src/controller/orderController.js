import Order from "../model/Order.js";
import Counter from "../model/Counter.js";

export const getAllOrder = async (req, res) => {
    try {
        const order = await Order.find().sort({order_id: 'asc'});

        res.json(order);
    } catch (error) {
        console.error('Loi khi goi getAllOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getByIdOrder = async (req, res) => {
    try {
        const id = Number(req.params.order_id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "order_id khong hop le"
            });
        }

        const order = await Order.findOne({order_id: id});

        if (!order) {
            return res.status(404).json({
                message: 'Khong tim thay don hang'
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Loi khi goi getByIdOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const createOrder = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "order_id" },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true
            }
        );

        const order = new Order({
            ...req.body,
            order_id: counter.seq
        });

        const newOrder = await order.save();

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Loi khi goi createOrder:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateOrder = async (req, res) => {
    try {
        const id = Number(req.params.order_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'order_id khong hop le'
            });
        }

        const update = await Order.findOneAndUpdate(
            {order_id: id},
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if (!update) {
            return res.status(404).json({
                message: 'Khong tim thay don hang de cap nhat'
            });
        }

        res.status(200).json(update);
    } catch (error) {
        console.error('Loi khi goi updateOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const id = Number(req.params.order_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "order_id khong hop le"
            });
        }

        const deleteOrd = await Order.findOneAndDelete({
            order_id: id
        });

        if (!deleteOrd) {
            return res.status(404).json({
                message: "Khong tim thay don hang de xoa"
            });
        }

        res.status(200).json({
            message: "Xoa don hang thanh cong",
            order: deleteOrd
        });
    } catch (error) {
        console.error("Loi khi goi deleteOrder:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const searchOrder = async (req, res) => {
    try {
        const {keyword} = req.query;

        if (!keyword || !keyword.trim()) {
            return res.status(400).json({
                message: 'Vui long nhap tu khoa tim kiem'
            });
        }

        const order = await Order.find({
            status: {
                $regex: keyword.trim(),
                $options: "i"
            }
        }).sort({order_id: 1});

        if (order.length === 0) {
            return res.status(404).json({
                message: 'Khong tim thay don hang',
                order: []
            });
        }

        res.status(200).json({
            message: 'Tim thay don hang',
            order
        });
    } catch (error) {
        console.error('Loi khi goi searchOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const id = Number(req.params.order_id);
        const {status} = req.body;

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'order_id khong hop le'
            });
        }

        if (!status || !status.trim()) {
            return res.status(400).json({
                message: 'Vui long nhap trang thai don hang'
            });
        }

        const update = await Order.findOneAndUpdate(
            {order_id: id},
            {$set: {status: status.trim()}},
            {new: true, runValidators: true}
        );

        if (!update) {
            return res.status(404).json({
                message: 'Khong tim thay don hang'
            });
        }

        res.status(200).json({
            message: 'Cap nhat trang thai don hang thanh cong',
            order: update
        });
    } catch (error) {
        console.error('Loi khi goi updateOrderStatus', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getOrdersByCustomer = async (req, res) => {
    try {
        const id = Number(req.params.customer_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'customer_id khong hop le'
            });
        }

        const order = await Order.find({
            customer_id: id
        }).sort({order_id: 1});

        if (order.length === 0) {
            return res.status(404).json({
                message: 'Khach hang chua co don hang nao',
                order: []
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Loi khi goi getOrdersByCustomer', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getOrdersByStore = async (req, res) => {
    try {
        const id = Number(req.params.store_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'store_id khong hop le'
            });
        }

        const order = await Order.find({
            store_id: id
        }).sort({order_id: 1});

        if (order.length === 0) {
            return res.status(404).json({
                message: 'Cua hang chua co don hang nao',
                order: []
            });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Loi khi goi getOrdersByStore', error);
        res.status(500).json({message: 'Server Error'});
    }
};