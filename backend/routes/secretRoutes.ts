import express from "express";
import verifyToken from "../middleware/verifyToken";
import { postKey } from "../controllers/secretControllers";
const router = express.Router();

router.post("/", verifyToken, postKey);

export default router;
