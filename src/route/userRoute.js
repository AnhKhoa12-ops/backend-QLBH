import express from 'express'
import { createUser, deleteAllUser, deleteUser, getAllUser, getOneUser, updateUser } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.get('/', getAllUser)

userRouter.get('/:user_id', getOneUser)

userRouter.post('/', createUser)

userRouter.put('/:user_id', updateUser)

userRouter.delete('/deleteAll', deleteAllUser )

userRouter.delete('/:user_id', deleteUser)



export default userRouter;