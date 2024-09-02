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
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) {
            return res.status(404).json({ message: "No User Found" });
        }
        const cartItems = yield prisma_1.default.cart.findMany({
            where: { userId: parseInt(id) },
            include: { products: true },
        });
        res.status(200).json({ message: "Successfully", cartItems });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = getCart;
