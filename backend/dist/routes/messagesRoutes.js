"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesControllers_1 = require("../controllers/messagesControllers");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const checkToken_1 = __importDefault(require("../middleware/checkToken"));
const router = express_1.default.Router();
router.get("/", checkToken_1.default, messagesControllers_1.getMessages);
router.post("/", verifyToken_1.default, messagesControllers_1.createMessage);
exports.default = router;
