import Role from "../model/Role.js";
import Counter from "../model/Counter.js";

export const getRole = async (req, res) => {
    try {
        const role = await Role.find().sort({role_id: 1})
        res.json(role)
    } catch (error) {
        console.error('Loi khi goi getRole', error)
        res.json({message: 'Server Error'})
    }
}

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.find({role_id: req.params.role_id})
        res.json(role)
    } catch (error) {
        console.error('Loi khi goi getRoleById', error)
        res.json({message: 'Server Error'})
    }
}

export const createRole = async (req, res) => {
    let counter = null
    try {
        counter = await Counter.findOneAndUpdate(
            {_id: 'req.params.role_id'},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )

        const role = new Role({
            ...req.body, 
            role_id: counter.seq
        })

        const newRole = await role.save()

        res.json(newRole)
    } catch (error) {
        console.error('Loi khi goi createError', error)
        if(counter) {
            try {
                await Counter.findOneAndUpdate(
                    {_id: 'req.params.role_id'},
                    {$inc: {seq: -1}}
                )

            } catch (counterError) {
                console.error('Loi khi hoan tac counter', counterError)
            }
        }
        res.json({message: 'Server Error'})
    }
}

export const updateRole = async (req, res) => {
    try {
        const update = await Role.findOneAndUpdate(
            {role_id: req.params.role_id},
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if(!update) {
            return res.json({message: 'Khong co cap nhat'})
        }
        res.json(update)
    } catch (error) {
        console.error('Loi khi goi updateRole', error)
        res.json({message: 'Server Error'})
    }
}

export const deleteRole = async (req, res) => {
    try {
        const deleteRole = await Role.findOneAndDelete({role_id: req.params.role_id})
        res.json(deleteRole)
    } catch (error) {
        console.error('Loi khi goi deleteRole', error)
        res.json({message: 'Server Error'})
    }
}