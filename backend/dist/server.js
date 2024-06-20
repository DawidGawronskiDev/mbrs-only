"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("./config/passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const messagesRoutes_1 = __importDefault(require("./routes/messagesRoutes"));
const secretRoutes_1 = __importDefault(require("./routes/secretRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI);
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/auth", authRoutes_1.default);
app.use("/messages", messagesRoutes_1.default);
app.use("/secret", secretRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
