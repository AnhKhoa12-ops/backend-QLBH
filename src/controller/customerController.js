import Customer from "../model/Customer.js";
import Counter from "../model/Counter.js";

export const getCustomer = async (req, res) => {
    try {
        const cus = await Customer.find().sort({customer_id: 1})
        res.json(cus)
    } catch (error) {
        console.error('Loi khi goi getCustomer', error)
        res.json({message: 'Server Error'})
    }
}

export const getCustomerByID = async (req, res) => {
    try {
        const cus = await Customer.findOne({customer_id: req.params.customer_id})
        res.json(cus)
    } catch (error) {
        console.error('Loi khi goi getCustomerByID', error)
        res.json({message: 'Server Error'})
    }
}

export const createCustomer = async (req, res) => {
    let counter = null
    try {
        counter = await Counter.findOneAndUpdate(
            {_id: 'req.params.customer_id'},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )

        const cus = new Customer({
            ...req.body,
            customer_id: counter.seq
        })

        const newCus = await cus.save()

        res.json(newCus)
    } catch (error) {
        console.error('Loi khi goi createCustomer', error)
        if(counter) {
            try {
                await Counter.findOneAndUpdate(
                    {_id: 'req.params.customer_id'},
                    {$inc: {seq: -1}}
                )
            } catch (counterError) {
                console.error('Loi khi hoan tac Counter', counterError)
            }
        }
        res.json({message: 'Server Error'})
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const update = await Customer.findOneAndUpdate(
            {customer_id: req.params.customer_id},
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if(!update) {
            return res.json({message: 'Khong co update'})
        }
        res.json(update)

    } catch (error) {
        console.error('Loi khi goi updateCustomer', error)
        res.json({message: 'Server Error'})
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const deleteCus = await Customer.findOneAndDelete({customer_id: req.params.customer_id})
        res.json(deleteCus)
    } catch (error) {
        console.error('Loi khi goi deleteCustomer', error)
        res.json({message: 'Server Error'})
    }
}

export const searchCustomer = async (req, res) => {
    try {
        const {keyword} = req.query
        if(!keyword || !keyword.trim()){
            return res.json({message: 'Nhap ten tim kiem'})
        }
        const search = new Customer.find({
            name: {
                $regex: keyword.trim(),
                $options: "i"
            }
        }).sort({customer_id: 1})

        if(!search) {
            return res.json({message: 'Khong tim thay san pham'})
        }
        res.json(search)
    } catch (error) {
        console.error('Loi khi goi searchCustomer', error)
        res.json({message: 'Server Error'})
    }
}

export const updateCustomerPoints = async (req, res) => {
    try {
        const updatePoint = await Customer.findOneAndUpdate(
            {customer_id: req.params.customer_id},
            {$set: {points: req.body.points}},
            {new: true, runValidators: true}
        )
        res.json(updatePoint)
    } catch (error) {
        console.error('Loi khi goi searchCustomer', error)
        res.json({message: 'Server Error'})
    }
}