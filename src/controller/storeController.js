import Counter from "../model/Counter.js";
import Store from "../model/Store.js";

export const getAllStore = async (req, res) => {
    try {
        const store = await Store.find().sort({store_id: 'asc'})
        res.json(store)
    } catch (error) {
        console.error('Loi khi goi getAllStore', error)
        res.json({message: 'Server error'})
    }
}

export const getOneStore = async (req, res) => {
    try {
        const id = Number(req.params.store_id)
        const store = await Store.findOne({store_id: id})
        res.json(store)
    } catch (error) {
        console.error('Loi khi goi getOneStore', error)
        res.json({message: 'Server error'})
    }
}

export const createStore = async (req, res) => {
    let counter = null
    try {
    counter = await Counter.findOneAndUpdate(
        {_id: 'store_id'},
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    )

    const store = new Store({...req.body, store_id: counter.seq}) 
    const newStore = await store.save()
    res.json(newStore)

    } catch (error) {
        console.error('Loi khi goi createStore', error)
        if(counter){
            try {
                await Counter.findOneAndUpdate(
        {_id: 'store_id'},
        {$inc: {seq: -1}},
       
    )
            } catch (counterError) {
                console.error('Hoan tac counter', counterError)
            }
    
        }
        res.json({message: 'Server error'})
    }
<<<<<<< HEAD
}

export const updateStore = async (req, res) => {
    try {
        const update = await Store.findOneAndUpdate(
            {store_id: req.params.store_id},
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if(!update) {
            return res.json({message: 'Khong co cap nhat'})
        }
        res.json(update)

    } catch (error) {
        console.error('Loi khi goi updateStore', error)
        res.json({message: 'Server Error'})
    }
}

export const deleteStore = async (req, res) => {
    try {
        const deleteStore = await Store.findOneAndDelete({store_id: req.params.store_id})
        res.json(deleteStore)
    } catch (error) {
        console.error('Loi khi goi deleteStore', error)
        res.json({message: 'Server Error'})
    }
}

export const updateStoreStatus = async (req,res) => {
    try {
        const updateStatus = await Store.findOneAndUpdate(
            {store_id: req.params.store_id},
            {$set: {status: req.body.status}},
            {new: true, runValidators: true}
        )

        if(!updateStatus) {
            return res.json({message: 'Khong co cap nhat'})
        }
        res.json(updateStatus)
    } catch (error) {
        console.error('Loi khi goi updateStoreStatus', error)
        res.json({message: 'Server Error'})
    }
}

export const searchStore = async (req, res) => {
    try {
        const {keyword} = req.query
        if(!keyword || !keyword.trim()) {
            return res.json({message: 'Nhap ten store can tim'})
        }
        const search = await Store.find({
            store_name: {
                $regex: keyword.trim(),
                $options: "i"
            }
        })
        res.json(search)
    } catch (error) {
        console.error('Loi khi goi searchStore', error)
        res.json({message: 'Server Error'})
    }
=======
>>>>>>> 505c4fde414440cdf214fecc0eb728879c73e271
}