'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const controller_wrapper_util_1 = require('../../app/controller-wrapper.util')
const teams_controller_1 = require('./teams.controller')
const auth_middleware_1 = require('../auth/auth.middleware')
const teams_router_1 = __importDefault(require('../teams/teams.router'))
const usersRouter = (0, express_1.Router)()
usersRouter.get(
  '/:id/teams',
  (0, controller_wrapper_util_1.controllerWrapper)(auth_middleware_1.authMiddleware),
  (0, controller_wrapper_util_1.controllerWrapper)(teams_controller_1.getTeamPlayersHandler)
)
exports.default = teams_router_1.default
