import OrderDetail from "../model/OrderDetail.js";
import Counter from "../model/Counter.js";

export const getAllOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.find()
            .sort({order_detail_id: 'asc'});

        res.json(orderDetail);
    } catch (error) {
        console.error('Loi khi goi getAllOrderDetail', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getByIdOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.order_detail_id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "order_detail_id khong hop le"
            });
        }

        const orderDetail = await OrderDetail.findOne({
            order_detail_id: id
        });

        if (!orderDetail) {
            return res.status(404).json({
                message: 'Khong tim thay chi tiet don hang'
            });
        }

        res.status(200).json(orderDetail);
    } catch (error) {
        console.error('Loi khi goi getByIdOrderDetail', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const createOrderDetail = async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { _id: "order_detail_id" },
            { $inc: { seq: 1 } },
            {
                new: true,
                upsert: true
            }
        );

        const orderDetail = new OrderDetail({
            ...req.body,
            order_detail_id: counter.seq
        });

        const newOrderDetail = await orderDetail.save();

        res.status(201).json(newOrderDetail);
    } catch (error) {
        console.error("Loi khi goi createOrderDetail:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.order_detail_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'order_detail_id khong hop le'
            });
        }

        const update = await OrderDetail.findOneAndUpdate(
            {order_detail_id: id},
            {$set: req.body},
            {new: true, runValidators: true}
        );

        if (!update) {
            return res.status(404).json({
                message: 'Khong tim thay chi tiet don hang de cap nhat'
            });
        }

        res.status(200).json(update);
    } catch (error) {
        console.error('Loi khi goi updateOrderDetail', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const deleteOrderDetail = async (req, res) => {
    try {
        const id = Number(req.params.order_detail_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "order_detail_id khong hop le"
            });
        }

        const deleteDetail = await OrderDetail.findOneAndDelete({
            order_detail_id: id
        });

        if (!deleteDetail) {
            return res.status(404).json({
                message: "Khong tim thay chi tiet don hang de xoa"
            });
        }

        res.status(200).json({
            message: "Xoa chi tiet don hang thanh cong",
            orderDetail: deleteDetail
        });
    } catch (error) {
        console.error("Loi khi goi deleteOrderDetail:", error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getOrderDetailsByOrder = async (req, res) => {
    try {
        const id = Number(req.params.order_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'order_id khong hop le'
            });
        }

        const orderDetail = await OrderDetail.find({
            order_id: id
        }).sort({order_detail_id: 1});

        if (orderDetail.length === 0) {
            return res.status(404).json({
                message: 'Don hang chua co chi tiet san pham nao',
                orderDetail: []
            });
        }

        res.status(200).json(orderDetail);
    } catch (error) {
        console.error('Loi khi goi getOrderDetailsByOrder', error);
        res.status(500).json({message: 'Server Error'});
    }
};

export const getOrderDetailsByProduct = async (req, res) => {
    try {
        const id = Number(req.params.product_id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'product_id khong hop le'
            });
        }

        const orderDetail = await OrderDetail.find({
            product_id: id
        }).sort({order_detail_id: 1});

        if (orderDetail.length === 0) {
            return res.status(404).json({
                message: 'San pham chua co trong don hang nao',
                orderDetail: []
            });
        }

        res.status(200).json(orderDetail);
    } catch (error) {
        console.error('Loi khi goi getOrderDetailsByProduct', error);
        res.status(500).json({message: 'Server Error'});
    }
};