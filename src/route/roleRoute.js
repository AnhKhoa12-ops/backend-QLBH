import express from 'express'
import { createRole, deleteRole, getRole, getRoleById, updateRole } from '../controller/roleController.js'

const roleRouter = express.Router()

roleRouter.get('/', getRole)

roleRouter.get('/:role_id', getRoleById)

roleRouter.post('/', createRole)

roleRouter.put('/:role_id', updateRole)

roleRouter.delete('/:role_id', deleteRole)

export default roleRouter;