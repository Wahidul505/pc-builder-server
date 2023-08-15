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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pcPartService = void 0;
const pcPart_model_1 = require("./pcPart.model");
const getAllPcParts = () => __awaiter(void 0, void 0, void 0, function* () {
    const pcParts = yield pcPart_model_1.PcPart.find();
    return pcParts;
});
const getRandomPcParts = () => __awaiter(void 0, void 0, void 0, function* () {
    const pcParts = yield pcPart_model_1.PcPart.aggregate([{ $sample: { size: 6 } }]);
    return pcParts;
});
const getSinglePcPart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pcPart = yield pcPart_model_1.PcPart.findById(id);
    return pcPart;
});
const getPcPartsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const pcPart = yield pcPart_model_1.PcPart.find({ category: category.toLowerCase() });
    return pcPart;
});
exports.pcPartService = {
    getAllPcParts,
    getRandomPcParts,
    getSinglePcPart,
    getPcPartsByCategory,
};
