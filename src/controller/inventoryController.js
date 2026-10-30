import Inventory from "../model/Inventory.js";
import Counter from "../model/Counter.js";

export const getInventory = async (req, res) => {
    try {
        const inven = await Inventory.find().sort({inventory_id: 1})
        res.json(inven)
    } catch (error) {
        console.error('Loi khi goi getInventory', error)
        res.json({message: 'Server Error'})
    }
}

export const getInventoryById = async (req, res) => {
    try {
        const inven = await Inventory.findOne({inventory_id: req.params.inventory_id})
        res.json(inven)
    } catch (error) {
        console.error('loi khi goi getInventoryById', error)
        res.json({message: 'Server Error'})
    }
}

export const getInventoryByStore = async (req, res) => {
    try {
        const inven = await Inventory.findOne({store_id: req.params.store_id})
        res.json(inven)
    } catch (error) {
        console.error('Loi khi goi getInventoryByStore', error)
        res.json({message: 'Server Error'})
    }
}

export const getInventoryByProduct = async (req, res) => {
     try {
        const inven = await Inventory.findOne({product_id_id: req.params.product_id})
        res.json(inven)
    } catch (error) {
        console.error('Loi khi goi getInventoryByProduct', error)
        res.json({message: 'Server Error'})
    }
}

export const getLowStockProducts = async (req, res) => {
    try {
        const inven = await Inventory.find({
            $expr: { $lt: ["$quantity", "$min_quantity"] }
        });

        res.json(inven)
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error'
        });
    }
}

export const createInventory = async (req, res) => {
    let counter = null
    try {
        counter = await Counter.findOneAndUpdate(
            {_id: 'req.params.inventory_id'},
            {$ind: {seq: 1}},
            {new: true, upsert: true}
        )

        const inven = new Inventory({
            ...req.body,
            inventory_id: counter.seq
        }
        )
        const newInven = await inven.save()
        res.json(newInven)
    } catch (error) {
        console.error('Loi khi goi createInventory', error)
        if(counter) {
            try {
                await Counter.findOneAndUpdate(
                    {_id: 'req.params.inventory_id'},
                    {$inc: {seq: -1}}
                )
            } catch (counterError) {
                console.error('Loi khi hoan tac counter', counterError)
            }
        }
        res.json({message: 'Server Error'})
    }
}

export const updateInventory = async (req, res) => {
    try {
        const update = await Inventory.findOneAndUpdate(
            {inventory_id: req.params.inventory_id},
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if(!update) {
            return res.json({message: 'Khong co ban cap nhat'})
        }
        res.json(update)
    } catch (error) {
        console.error('Loi khi goi updateInventory', error)
        res.json({message: 'Server Error'})
    }
}