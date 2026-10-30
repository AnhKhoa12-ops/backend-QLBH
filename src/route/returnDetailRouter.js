import express from "express";
import {
    getAllReturnDetail,
    getByIdReturnDetail,
    createReturnDetail,
    updateReturnDetail,
    deleteReturnDetail,
    searchReturnDetail
} from "../controller/returnDetailController.js";

const returnDetailRouter = express.Router();

returnDetailRouter.get("/", getAllReturnDetail);
returnDetailRouter.get("/search", searchReturnDetail);
returnDetailRouter.get("/:return_detail_id", getByIdReturnDetail);
returnDetailRouter.post("/", createReturnDetail);
returnDetailRouter.put("/:return_detail_id", updateReturnDetail);
returnDetailRouter.delete("/:return_detail_id", deleteReturnDetail);

export default returnDetailRouter;
