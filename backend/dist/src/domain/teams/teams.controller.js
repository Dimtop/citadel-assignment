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
exports.updateTeamPlayerHandler = exports.deleteTeamPlayerHandler = exports.createTeamPlayerHandler = exports.getTeamPlayersHandler = exports.deleteTeamHandler = exports.createTeamHandler = exports.getTeamHandler = exports.getTeamsHandler = void 0;
const class_transformer_1 = require("class-transformer");
const teams_types_1 = require("./teams.types");
const teams_service_1 = require("./teams.service");
const users_types_1 = require("../users/users.types");
const getTeamsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield (0, teams_service_1.getTeams)(req.query);
    res.json(teams.map((team) => {
        return Object.assign(Object.assign({}, team), { user: (0, class_transformer_1.plainToInstance)(users_types_1.UserPostResDTO, team.user, { excludeExtraneousValues: true }) });
    }));
});
exports.getTeamsHandler = getTeamsHandler;
const getTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const team = yield (0, teams_service_1.getTeam)(id);
    res.json(Object.assign(Object.assign({}, team), { user: (0, class_transformer_1.plainToInstance)(users_types_1.UserPostResDTO, team === null || team === void 0 ? void 0 : team.user, { excludeExtraneousValues: true }) }));
});
exports.getTeamHandler = getTeamHandler;
const createTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamData = (0, class_transformer_1.plainToInstance)(teams_types_1.TeamPostReqBodyDTO, req.body, { excludeExtraneousValues: true });
    const team = yield (0, teams_service_1.createTeam)(teamData);
    res.json(Object.assign(Object.assign({}, team), { user: (0, class_transformer_1.plainToInstance)(users_types_1.UserPostResDTO, team.user, { excludeExtraneousValues: true }) }));
});
exports.createTeamHandler = createTeamHandler;
const deleteTeamHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, teams_service_1.deleteTeam)(id);
    res.json(id);
});
exports.deleteTeamHandler = deleteTeamHandler;
const getTeamPlayersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const players = yield (0, teams_service_1.getTeamPlayers)(id);
    res.json(players);
});
exports.getTeamPlayersHandler = getTeamPlayersHandler;
const createTeamPlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playerData = (0, class_transformer_1.plainToInstance)(teams_types_1.TeamPlayerPostReqBodyDTO, req.body, {
        excludeExtraneousValues: true
    });
    const player = yield (0, teams_service_1.createTeamPlayer)(playerData);
    res.json(player);
});
exports.createTeamPlayerHandler = createTeamPlayerHandler;
const deleteTeamPlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId } = req.params;
    yield (0, teams_service_1.deleteTeamPlayer)(playerId);
    res.json(playerId);
});
exports.deleteTeamPlayerHandler = deleteTeamPlayerHandler;
const updateTeamPlayerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId } = req.params;
    const player = yield (0, teams_service_1.updateTeamPlayer)(playerId, req.body);
    res.json(player);
});
exports.updateTeamPlayerHandler = updateTeamPlayerHandler;
