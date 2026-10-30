import express from "express";
import {
    getAllReturn,
    getByIdReturn,
    createReturn,
    updateReturn,
    deleteReturn,
    searchReturn
} from "../controller/returnController.js";

const returnDataRouter = express.Router();

returnDataRouter.get("/", getAllReturn);
returnDataRouter.get("/search", searchReturn);
returnDataRouter.get("/:return_id", getByIdReturn);
returnDataRouter.post("/", createReturn);
returnDataRouter.put("/:return_id", updateReturn);
returnDataRouter.delete("/:return_id", deleteReturn);

export default returnDataRouter;
