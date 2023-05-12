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
exports.renewAuthHandler = exports.verifyOTPHander = exports.loginHanlder = exports.registerHandler = void 0;
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const errors_types_1 = require("../../app/errors.types");
const class_transformer_1 = require("class-transformer");
const auth_types_1 = require("./auth.types");
const bcrypt = __importStar(require("bcrypt"));
const qrcode_1 = __importDefault(require("qrcode"));
const registerHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const registrationData = (0, class_transformer_1.plainToInstance)(auth_types_1.RegisterReqBodyDTO, req.body, {
        excludeExtraneousValues: true
    });
    const existingUser = yield (0, users_service_1.getUsers)({ email: registrationData.email });
    if (existingUser.length > 0) {
        throw new errors_types_1.AlreadyExistsException('This user already exists');
    }
    const otpSecretData = (0, auth_service_1.generateOTPSecret)(registrationData.email);
    const user = yield (0, auth_service_1.register)(Object.assign(Object.assign({}, registrationData), { password: yield bcrypt.hash(registrationData.password, 12), has2faEnabled: false, otpSecret: otpSecretData.secret }));
    const qrCode = yield qrcode_1.default.toDataURL(otpSecretData.keyURI);
    res.json((0, class_transformer_1.plainToInstance)(auth_types_1.RegisterResDTO, Object.assign(Object.assign({}, user), { qrCode }), { excludeExtraneousValues: true }));
});
exports.registerHandler = registerHandler;
const loginHanlder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = (0, class_transformer_1.plainToInstance)(auth_types_1.LoginReqBodyDTO, req.body, { excludeExtraneousValues: true });
    const loginResponse = yield (0, auth_service_1.login)(loginData);
    res.json((0, class_transformer_1.plainToInstance)(auth_types_1.LoginResDTO, loginResponse, { excludeExtraneousValues: true }));
});
exports.loginHanlder = loginHanlder;
const verifyOTPHander = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, userId } = req.body;
    res.json(yield (0, auth_service_1.verifyOTP)(userId, code));
});
exports.verifyOTPHander = verifyOTPHander;
const renewAuthHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    res.json(yield (0, auth_service_1.renewAuth)(refreshToken));
});
exports.renewAuthHandler = renewAuthHandler;
