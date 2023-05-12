'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = require('express')
const users_controller_1 = require('./users.controller')
const usersRouter = (0, express_1.Router)()
usersRouter.get('/all', users_controller_1.getAllUsersHandler)
exports.default = usersRouter
