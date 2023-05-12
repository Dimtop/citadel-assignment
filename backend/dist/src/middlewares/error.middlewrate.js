'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.errorMiddleware = void 0
const errorMiddleware = (error, req, res, next) => {
  console.log(error)
  res.status(error.statusCode).json(Object.assign(Object.assign({}, error), { success: false }))
}
exports.errorMiddleware = errorMiddleware
