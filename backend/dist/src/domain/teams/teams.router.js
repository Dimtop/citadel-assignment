"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_wrapper_util_1 = require("../../app/controller-wrapper.util");
const teams_controller_1 = require("./teams.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.getTeamsHandler));
teamsRouter.get('/:id', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.getTeamHandler));
teamsRouter.get('/:id/players', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.getTeamPlayersHandler));
teamsRouter.post('/:id/players', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.createTeamPlayerHandler));
teamsRouter.post('/', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.createTeamHandler));
teamsRouter.delete('/:id', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.deleteTeamHandler));
teamsRouter.delete('/:teamId/players/:playerId', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.deleteTeamPlayerHandler));
teamsRouter.put('/:teamId/players/:playerId', (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware), (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.updateTeamPlayerHandler));
exports.default = teamsRouter;