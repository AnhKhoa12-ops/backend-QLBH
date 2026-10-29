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
}