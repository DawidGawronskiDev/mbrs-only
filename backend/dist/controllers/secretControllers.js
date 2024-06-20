"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postKey = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const postKeyValidation = [
    (0, express_validator_1.body)("key")
        .trim()
        .notEmpty()
        .withMessage("Key field must be filled")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        if (value !== "mbrs") {
            throw new Error("Wrong key");
        }
    }))
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const userId = req.token.userId;
        const existingUser = yield userModel_1.default.findById(userId);
        connection.disconnect();
        if (existingUser && existingUser.isMember) {
            throw new Error("You are already a member");
        }
    })),
];
exports.postKey = [
    ...postKeyValidation,
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            const userId = req.token.userId;
            const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
            const existingUser = yield userModel_1.default.findById(userId);
            if (!existingUser) {
                res.status(400).json({ message: "User does not exists" });
                return;
            }
            yield userModel_1.default.findByIdAndUpdate(userId, { isMember: true });
            connection.disconnect();
            res.status(200).json({ message: "You are a member" });
            return;
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    })),
];
