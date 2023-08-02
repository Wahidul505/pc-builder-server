"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingStatusRoutes = void 0;
const express_1 = __importDefault(require("express"));
const readingStatus_controller_1 = require("./readingStatus.controller");
const router = express_1.default.Router();
router.patch('/', readingStatus_controller_1.ReadingStatusController.changeStatus);
router.get('/', readingStatus_controller_1.ReadingStatusController.getStatus);
exports.ReadingStatusRoutes = router;
