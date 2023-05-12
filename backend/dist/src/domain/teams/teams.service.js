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
exports.updateTeamPlayer = exports.deleteTeamPlayer = exports.createTeamPlayer = exports.getTeamPlayers = exports.getTeam = exports.getTeams = exports.deleteTeam = exports.updateTeam = exports.createTeam = void 0;
const errors_types_1 = require("../../app/errors.types");
const db_instance_1 = require("../../db/db-instance");
const users_service_1 = require("../users/users.service");
const players_entity_1 = require("./players.entity");
const teams_entity_1 = require("./teams.entity");
const teamsRepository = db_instance_1.DBInstance.getRepository(teams_entity_1.Team);
const playersRepository = db_instance_1.DBInstance.getRepository(players_entity_1.Player);
const createTeam = (team) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, users_service_1.getUser)(team.user);
    if (!user) {
        throw new errors_types_1.InvalidRequestException('Wrong user id');
    }
    const existingTeam = yield teamsRepository.findOne({
        where: {
            name: team.name
        }
    });
    if (existingTeam) {
        throw new errors_types_1.AlreadyExistsException('This team already exists');
    }
    return yield teamsRepository.save(Object.assign(Object.assign({}, team), { user }));
});
exports.createTeam = createTeam;
const updateTeam = (team) => __awaiter(void 0, void 0, void 0, function* () { return yield teamsRepository.save(team); });
exports.updateTeam = updateTeam;
const deleteTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () { return yield teamsRepository.delete({ id: teamId }); });
exports.deleteTeam = deleteTeam;
const getTeams = (query) => __awaiter(void 0, void 0, void 0, function* () { return yield teamsRepository.find({ where: Object.assign({}, query), relations: ['user'] }); });
exports.getTeams = getTeams;
const getTeam = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield teamsRepository.findOne({ where: { id } }); });
exports.getTeam = getTeam;
const getTeamPlayers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield playersRepository.find({
        where: {
            team: {
                id
            }
        },
        relations: {
            team: true
        }
    });
});
exports.getTeamPlayers = getTeamPlayers;
const createTeamPlayer = (player) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, exports.getTeam)(player.team);
    if (!team) {
        throw new errors_types_1.InvalidRequestException('Wrong team');
    }
    const existingPlayer = yield playersRepository.findOne({
        where: {
            name: player.name,
            team: { id: player.team }
        }
    });
    if (existingPlayer) {
        throw new errors_types_1.AlreadyExistsException('This player is already in the team');
    }
    return yield playersRepository.save(Object.assign(Object.assign({}, player), { team }));
});
exports.createTeamPlayer = createTeamPlayer;
const deleteTeamPlayer = (playerId) => __awaiter(void 0, void 0, void 0, function* () { return yield playersRepository.delete({ id: playerId }); });
exports.deleteTeamPlayer = deleteTeamPlayer;
const updateTeamPlayer = (playerId, player) => __awaiter(void 0, void 0, void 0, function* () { return yield playersRepository.update({ id: playerId }, player); });
exports.updateTeamPlayer = updateTeamPlayer;
