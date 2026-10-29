
import User from '../model/User.js'
import Counter from '../model/Counter.js'
import bcrypt from 'bcrypt'

export const getAllUser = async (req, res) => {
    try {
        const user = await User.find().select('-password')
        res.status(200).json(user)
    } catch (error) {
        console.error('Loi khi goi getAllUser' , user)
        res.status(500).json({message: 'Server error'})
    }
}

export const getOneUser = async (req,res) => {
    try {
        const id = req.params.user_id

        if(!Number.isInteger(id) || id <=0) {
            return res.status(404).json({message: 'ID khong hop le'})
        }

        const finduser = await User.findOne({user_id: id}).select('-password')
        res.status(200).json(finduser)
    } catch (error) {
        console.error('Loi khi goi findOneUser', error)
        res.status(500).json({message: 'Server error'})
    }
}

export const createUser = async (req, res) => {

  let counter = null

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        counter = await Counter.findOneAndUpdate(
            {_id: 'user_id'},
            {$inc: {seq: 1}},
            {new: true, upsert: true}
        )

        const user = new User({
            ...req.body,
            user_id: counter.seq,
            password: hashedPassword
        })

        const newUser = await user.save()
         const result = newUser.toObject();
        delete result.password;

        res.status(200).json(newUser)
    } catch (error) {
        console.error('Loi khi goi createUser', error)
         if (counter) {
            try {
                await Counter.findOneAndUpdate(
                    { _id: "user_id" },
                    { $inc: { seq: -1 } }
                );
            } catch (counterError) {
                console.error("Loi khi hoan tac Counter:", counterError);
            }
        }
        res.status(500).json({message: 'Server error'})
    } 
}

export const updateUser = async (req, res) => {
  
    try {
        

    const id = Number(req.params.user_id)
    if(!Number.isSafeInteger(id) || id <= 0) {
        return res.status(404).json({message: 'ID khong hop le'})
    }

    const update = await User.findOneAndUpdate(
        {user_id: id},
        {$set: req.body},
        {new: true, runValidators: true}
    )
    if(!update) {
        return res.status(404).json({message: 'Khong co update'})
    }
    res.json(update)
    } catch (error) {
        console.error('Loi khi goi updateUser', error)
        res.json({message: 'server error'})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.user_id)
        if(!Number.isSafeInteger(id) || id <= 0) {
            return res.json({message: 'ID khong hop le'})
        }
        const deleteUser = await User.findOneAndDelete({user_id: id})
        if(!deleteUser) {
            return res.json({message: 'Khong tim thay User xoa'})
        }
        res.json(deleteUser)
    } catch (error) {
        console.error('Loi khi goi deleteUser', error)
        res.json('server error')
    }
}

export const deleteAllUser = async (req, res) => {
    try {
        const result = await User.deleteMany({});

         await Counter.findOneAndUpdate(
            { _id: "user_id" },
            { $set: { seq: 0 } },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: "Xoa tat ca User thanh cong",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error("Loi khi goi deleteAllUser:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

//chưa mã hóa password