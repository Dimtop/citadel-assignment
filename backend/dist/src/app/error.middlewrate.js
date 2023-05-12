"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    res.status(error.statusCode || 500).json(Object.assign(Object.assign({}, error), { success: false }));
};
exports.errorMiddleware = errorMiddleware;
