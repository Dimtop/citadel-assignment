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
exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = exports.getAllUsers = void 0;
const db_instance_1 = require("../../db/db-instance");
const users_entity_1 = require("./users.entity");
const usersRepository = db_instance_1.DBInstance.getRepository(users_entity_1.User);
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield usersRepository.find(); });
exports.getAllUsers = getAllUsers;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield usersRepository.save(user); });
exports.createUser = createUser;
const getUsers = (query) => __awaiter(void 0, void 0, void 0, function* () { return yield usersRepository.find({ where: Object.assign({}, query) }); });
exports.getUsers = getUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield usersRepository.findOne({ where: { id } }); });
exports.getUser = getUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield usersRepository.save(user); });
exports.updateUser = updateUser;
