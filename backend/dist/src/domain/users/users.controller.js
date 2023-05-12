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
exports.createUserHandler = exports.getUsersHandler = void 0;
const users_service_1 = require("./users.service");
const class_transformer_1 = require("class-transformer");
const users_types_1 = require("./users.types");
const getUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const users = yield (0, users_service_1.getUsers)(query);
    res.json(users.map((user) => (0, class_transformer_1.plainToInstance)(users_types_1.UserPostResDTO, user, { excludeExtraneousValues: true })));
});
exports.getUsersHandler = getUsersHandler;
const createUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = (0, class_transformer_1.plainToInstance)(users_types_1.UserPostReqBodyDTO, req.body, { excludeExtraneousValues: true });
    const user = yield (0, users_service_1.createUser)(userData);
    res.json((0, class_transformer_1.plainToInstance)(users_types_1.UserPostResDTO, user, { excludeExtraneousValues: true }));
});
exports.createUserHandler = createUserHandler;
