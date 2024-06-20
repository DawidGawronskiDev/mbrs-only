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
exports.createMessage = exports.getMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const messageModel_1 = __importDefault(require("../models/messageModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.getMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const userId = (_a = req.token) === null || _a === void 0 ? void 0 : _a.userId;
        const existingUser = yield userModel_1.default.findById(userId);
        const messages = yield messageModel_1.default.find({})
            .populate("author", "username")
            .select("content author _id");
        if (!messages) {
            res.status(400).json({ message: "Failed to fetch messagess" });
            return;
        }
        let encryptedMessages = [];
        if (!existingUser || !existingUser.isMember) {
            encryptedMessages = messages.map((message) => {
                const encryptedMessage = message;
                encryptedMessage.content = "Become a member to see message";
                return encryptedMessage;
            });
        }
        connection.disconnect();
        if (!existingUser || !existingUser.isMember) {
            res.status(200).json({ messages: [...encryptedMessages] });
            return;
        }
        res.status(200).json({ messages });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}));
const createMessageValidation = [
    (0, express_validator_1.body)("message")
        .trim()
        .notEmpty()
        .withMessage("Message must not be empty")
        .isLength({ max: 250 })
        .withMessage("Message must be less then 250 characters"),
];
exports.createMessage = [
    ...createMessageValidation,
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { message } = req.body;
        const token = req.token;
        try {
            const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
            const newMessage = yield messageModel_1.default.create({
                content: message,
                author: token.userId,
            });
            if (!newMessage) {
                throw new Error();
            }
            yield newMessage.save();
            connection.disconnect();
            res.status(200).json({ message: "Message created successfully" });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    })),
];
