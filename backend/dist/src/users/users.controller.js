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
exports.getAllUsersHandler = void 0
const users_service_1 = require('./users.service')
const getAllUsersHandler = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log('test')
    const users = yield (0, users_service_1.getAllUsers)()
    console.log(users)
    res.json(users)
  })
exports.getAllUsersHandler = getAllUsersHandler
