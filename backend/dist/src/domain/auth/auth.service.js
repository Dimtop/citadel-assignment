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
exports.createUserTokens = exports.renewAuth = exports.login = exports.verifyOTP = exports.generateOTPSecret = exports.register = void 0;
const errors_types_1 = require("../../app/errors.types");
const users_service_1 = require("../users/users.service");
const otplib_1 = require("otplib");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const crypto = __importStar(require("crypto"));
const db_instance_1 = require("../../db/db-instance");
const accessToken_entity_1 = require("./accessToken.entity");
const refreshToken_entity_1 = require("./refreshToken.entity");
const moment_1 = __importDefault(require("moment"));
const accessTokensRespository = db_instance_1.DBInstance.getRepository(accessToken_entity_1.AccessToken);
const refreshTokensRespository = db_instance_1.DBInstance.getRepository(refreshToken_entity_1.RefreshToken);
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, users_service_1.createUser)(userData); });
exports.register = register;
const generateOTPSecret = (email) => {
    const secret = otplib_1.authenticator.generateSecret(20);
    return {
        keyURI: otplib_1.totp.keyuri(email, 'Citadel', secret),
        secret
    };
};
exports.generateOTPSecret = generateOTPSecret;
const verifyOTP = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_service_1.getUser)(userId);
    if (!user) {
        throw new errors_types_1.NotFoundException('User not found');
    }
    const isValid = otplib_1.authenticator.verify({ token, secret: user.otpSecret });
    yield (0, users_service_1.updateUser)(Object.assign(Object.assign({}, user), { has2faEnabled: isValid }));
    return isValid;
});
exports.verifyOTP = verifyOTP;
const login = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_service_1.getUsers)({ email: loginData.email });
    if (!users || users.length == 0) {
        throw new errors_types_1.UnauthorizedException('Wrong username');
    }
    const user = users[0];
    const isPasswordValid = yield bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new errors_types_1.UnauthorizedException('Wrong password');
    }
    return Object.assign(Object.assign({}, (yield (0, exports.createUserTokens)(user))), { userId: user.id });
});
exports.login = login;
const renewAuth = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromDb = yield refreshTokensRespository.findOneBy({
        token: refreshToken
    });
    if (!refreshTokenFromDb) {
        throw new errors_types_1.UnauthorizedException('Not authorized');
    }
    if ((0, moment_1.default)().isAfter(refreshTokenFromDb.expiresOn)) {
        throw new errors_types_1.UnauthorizedException('Refresh token expired');
    }
    return yield (0, exports.createUserTokens)(refreshTokenFromDb.user);
});
exports.renewAuth = renewAuth;
const createUserTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = {
        sub: user.id,
        userId: user.id,
        authorized: true
    };
    if (!process.env['JWT_SECRET'] || !process.env['JWT_DURATION']) {
        throw new errors_types_1.InternalError();
    }
    const accessToken = jwt.sign(payload, process.env['JWT_SECRET'], {
        expiresIn: `${process.env['JWT_DURATION']}h`
    });
    const refreshToken = crypto.randomBytes(64).toString('base64');
    const currentUserAccessToken = yield accessTokensRespository.findOneBy({ user: { id: user.id } });
    const currentUserRefreshToken = yield refreshTokensRespository.findOneBy({
        user: { id: user.id }
    });
    if (currentUserRefreshToken) {
        yield refreshTokensRespository.save(Object.assign(Object.assign({}, currentUserRefreshToken), { token: refreshToken, user: user, expiresOn: (0, moment_1.default)().add(Number(process.env['JWT_DURATION']), 'weeks').toDate() }));
    }
    else {
        yield refreshTokensRespository.save({
            user: user,
            token: refreshToken,
            expiresOn: (0, moment_1.default)().add(Number(process.env['JWT_DURATION']), 'weeks').toDate()
        });
    }
    if (currentUserAccessToken) {
        yield accessTokensRespository.save(Object.assign(Object.assign({}, currentUserAccessToken), { token: accessToken, user: user, expiresOn: (0, moment_1.default)().add(Number(process.env['JWT_DURATION']), 'hours').toDate() }));
    }
    else {
        yield accessTokensRespository.save({
            user: user,
            token: accessToken,
            expiresOn: (0, moment_1.default)().add(Number(process.env['JWT_DURATION']), 'hours').toDate()
        });
    }
    return {
        accessToken,
        refreshToken
    };
});
exports.createUserTokens = createUserTokens;
