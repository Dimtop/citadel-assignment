"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatMiddleware = void 0;
const responseFormatMiddleware = (req, res, next) => {
    const resJson = res.json;
    res.json = function (data) {
        if (data.success !== null && typeof data.success !== 'undefined' && !data.success) {
            return resJson.call(res, Object.assign({}, data));
        }
        return resJson.call(res, {
            data,
            success: true
        });
    };
    next();
};
exports.responseFormatMiddleware = responseFormatMiddleware;
