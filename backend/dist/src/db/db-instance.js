"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBInstance = void 0;
require('dotenv').config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../domain/users/users.entity");
const _1683736176187_otpSecret_1 = require("../../migrations/1683736176187-otpSecret");
const accessToken_entity_1 = require("../domain/auth/accessToken.entity");
const refreshToken_entity_1 = require("../domain/auth/refreshToken.entity");
const teams_entity_1 = require("../domain/teams/teams.entity");
const players_entity_1 = require("../domain/teams/players.entity");
const postgresConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
exports.DBInstance = new typeorm_1.DataSource(Object.assign(Object.assign({}, postgresConfig), { type: 'postgres', synchronize: true, logging: false, entities: [users_entity_1.User, accessToken_entity_1.AccessToken, refreshToken_entity_1.RefreshToken, teams_entity_1.Team, players_entity_1.Player], migrations: [_1683736176187_otpSecret_1.OtpSecret1683736176187] }));
