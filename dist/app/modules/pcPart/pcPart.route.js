"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcPartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pcPart_controller_1 = require("./pcPart.controller");
const router = express_1.default.Router();
router.get('/category/:category', pcPart_controller_1.pcPartController.getPcPartsByCategory);
router.get('/:id', pcPart_controller_1.pcPartController.getSinglePcPart);
router.get('/', pcPart_controller_1.pcPartController.getRandomPcParts);
exports.PcPartRoutes = router;
