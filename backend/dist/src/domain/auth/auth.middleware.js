"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authMiddleware = void 0;
const errors_types_1 = require("../../app/errors.types");
const db_instance_1 = require("../../db/db-instance");
const accessToken_entity_1 = require("./accessToken.entity");
const moment_1 = __importDefault(require("moment"));
const jwt = __importStar(require("jsonwebtoken"));
const accessTokensRespository = db_instance_1.DBInstance.getRepository(accessToken_entity_1.AccessToken);
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!Object.keys(req.headers).includes('authorization')) {
        throw new errors_types_1.UnauthorizedException('Authorization header not present');
    }
    const accessToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
    const accessTokenFromDB = yield accessTokensRespository.findOne({
        where: {
            token: accessToken
        }
    });
    if (!accessTokenFromDB) {
        throw new errors_types_1.UnauthorizedException('Not authorized');
    }
    if ((0, moment_1.default)().isAfter(accessTokenFromDB.expiresOn)) {
        throw new errors_types_1.UnauthorizedException('Access token expired');
    }
    try {
        if (!process.env['JWT_SECRET']) {
            throw new errors_types_1.InternalError();
        }
        const tokenData = jwt.verify(accessTokenFromDB.token, process.env['JWT_SECRET']);
        if (!tokenData.userId) {
            throw new errors_types_1.UnauthorizedException('Unauthorized user');
        }
        req.context = Object.assign(Object.assign({}, req.context), { userId: tokenData.userId });
        next();
    }
    catch (e) {
        console.log(e);
        throw new errors_types_1.UnauthorizedException('Error verifying access token');
    }
});
exports.authMiddleware = authMiddleware;
