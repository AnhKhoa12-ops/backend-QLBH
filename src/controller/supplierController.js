import Supplier from "../model/Supplier.js"
import Counter from '../model/Counter.js'

export const getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.find().sort({supplier_id: 1})
        res.json(supplier)
    } catch (error) {
        console.error('Loi khi goi getSupplier', error)
        res.json({message: 'Server Error'})
    }
}

export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({supplier_id: req.params.supplier_id})
        res.json(supplier)
    } catch (error) {
        console.error('Loi khi goi getSupplierById', error)
        res.json({message: 'Server Error'})
    }
}

export const createSupplier = async (req, res) => {
    let counter = null
    try {
        counter = await Counter.findOneAndUpdate(
            {_id: 'supplier_id'},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )
        const supplier = new Supplier({
            ...req.body,
            supplier_id: counter.seq
        })

        const newSupplier = await supplier.save();

        res.json(newSupplier)

    } catch (error) {
        console.error('Loi khi goi createSupplier', error)
        if(counter) {
            try {
                await Counter.findOneAndUpdate(
                    {_id: 'supplier_id'},
                    {$inc: {seq: -1}}
                )
            } catch (counterError) {
                console.error('Loi khi hoan tac counter', counterError)
            }
        }
        res.json({message: 'Server Error'})
    }
}

export const updateSupplier = async (req, res) => {
    try {
     const update = await Supplier.findOneAndUpdate(
        {supplier_id: req.params.supplier_id},
        {$set: req.body},
        {new: true, runValidators: true}
     )
     if(!update) {
        return res.json({message: 'Khong co ban cap nhat'})
     }   
     res.json(update)
    } catch (error) {
        console.error('Loi khi goi updateSupplier', error)
        res.json({message: 'Server Error'})
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const deleteSup = await Supplier.findOneAndDelete({supplier_id: req.params.supplier_id})
        res.json(deleteSup)
    } catch (error) {
        console.error('Loi khi goi deleteSupplier', error)
        res.json({message: 'Server Error'})
    }
}

export const searchSupplier = async (req, res) => {
    try {
        const {keyword} = req.query

        if(!keyword || !keyword.trim()) {
            return res.json({message: 'Nhap tu khoa tim kiem'})
        }

        const supplier = await Supplier.find({
            supplier_name: {
                $regex: keyword.trim(),
                $options: "i"
            }
        }).sort({supplier_id: 1})

        if(!supplier) {
            return res.json({message: 'Khong tim thay supplier'})
        }

        res.json(supplier)

    } catch (error) {
        console.error('Loi khi goi searchSupplier', error)
        res.json({message: 'Server Error'})
    }
}