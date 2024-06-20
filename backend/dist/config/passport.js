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
const passport = require("passport");
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
passport.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
    try {
        const user = yield userModel_1.default.findOne({ username });
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        const isPasswordCorrect = bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
exports.default = passport;
