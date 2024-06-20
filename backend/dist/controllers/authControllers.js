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
exports.SignIn = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const createToken_1 = __importDefault(require("../middleware/createToken"));
const signUpValidation = [
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .withMessage("Field is required")
        .isLength({ min: 6 })
        .withMessage("Username name must contain at least 6 characters")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const existingUsername = yield userModel_1.default.findOne({ username: value });
        if (existingUsername) {
            connection.disconnect();
            throw new Error("User already exists with that username");
        }
        connection.disconnect();
    })),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Emial must be provided")
        .isEmail()
        .withMessage("Field must be type of email")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const existingEmail = yield userModel_1.default.findOne({ email: value });
        if (existingEmail) {
            connection.disconnect();
            throw new Error("User already exists with that email");
        }
        connection.disconnect();
    })),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Password must be provided")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least six letters"),
];
exports.signUp = [
    ...signUpValidation,
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        try {
            const { username, email, password } = req.body;
            const existingUser = yield userModel_1.default.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield userModel_1.default.create({
                username,
                email,
                password: hashedPassword,
                isMember: false,
            });
            if (!newUser) {
                res.status(400).json({ message: "Failed to create user" });
            }
            yield newUser.save();
            connection.disconnect();
            res.status(200).json({ message: "User created successfully" });
        }
        catch (error) {
            console.error(error);
            connection.disconnect();
            res.status(500).json({ message: "Internal server error" });
        }
    })),
];
const logInValidation = [
    (0, express_validator_1.body)("username")
        .trim()
        .notEmpty()
        .withMessage("Field is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const existingUsername = yield userModel_1.default.findOne({ username: value });
        if (!existingUsername) {
            connection.disconnect();
            throw new Error("There is no user with that username");
        }
        connection.disconnect();
    })),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Field is required")
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
        const existingUser = yield userModel_1.default.findOne({ username: req.body.username });
        const isCorrect = yield bcryptjs_1.default.compare(value, existingUser.password);
        if (!isCorrect) {
            connection.disconnect();
            throw new Error("Incorrect password");
        }
        connection.disconnect();
    })),
];
exports.SignIn = [
    ...logInValidation,
    (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        next();
    })),
    passport_1.default.authenticate("local"),
    createToken_1.default,
    (req, res) => {
        const user = req.user;
        const token = req.token;
        try {
            if (!user) {
                throw new Error();
            }
            if (!token) {
                throw new Error();
            }
            const userData = {
                username: user.username,
                email: user.email,
            };
            res.status(200).json({ user: userData, token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
