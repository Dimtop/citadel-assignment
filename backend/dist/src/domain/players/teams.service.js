'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getPlayers = void 0
const db_instance_1 = require('../../db/db-instance')
const players_entity_1 = require('./players.entity')
const teams_entity_1 = require('../teams/teams.entity')
const teamsRepository = db_instance_1.DBInstance.getRepository(teams_entity_1.Team)
const playersRepository = db_instance_1.DBInstance.getRepository(players_entity_1.Player)
const getPlayers = (query) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield playersRepository.find({ where: Object.assign({}, query), relations: ['team'] })
  })
exports.getPlayers = getPlayers
