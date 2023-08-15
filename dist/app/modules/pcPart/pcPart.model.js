"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcPart = void 0;
const mongoose_1 = require("mongoose");
const PcPartSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['In Stock', 'Out of stock'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    keyFeatures: {
        type: [String],
    },
    individualRating: {
        type: Number,
    },
    averageRating: {
        type: Number,
        required: true,
    },
    reviews: {
        type: [String],
    },
});
exports.PcPart = (0, mongoose_1.model)('PcPart', PcPartSchema);
