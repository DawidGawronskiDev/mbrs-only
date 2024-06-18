import express from "express";
import { createMessage, getMessages } from "../controllers/messagesControllers";
import verifyToken from "../middleware/verifyToken";
import checkToken from "../middleware/checkToken";
const router = express.Router();

router.get("/", checkToken, getMessages);
router.post("/", verifyToken, createMessage);

export default router;
