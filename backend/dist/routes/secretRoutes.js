"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const secretControllers_1 = require("../controllers/secretControllers");
const router = express_1.default.Router();
router.post("/", verifyToken_1.default, secretControllers_1.postKey);
exports.default = router;
