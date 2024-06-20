"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.post("/signup", authControllers_1.signUp);
router.post("/signin", authControllers_1.SignIn);
exports.default = router;
