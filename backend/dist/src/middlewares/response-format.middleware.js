'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.responseFormatMiddleware = void 0
const responseFormatMiddleware = (req, res, next) => {
  let resJson = res.json
  res.json = function (data) {
    let payload = {}
    if (data.success !== null && !data.success) {
      return resJson.call(res, Object.assign({}, data))
    }
    res.status(200)
    return resJson.call(res, {
      data,
      success: true
    })
  }
  next()
}
exports.responseFormatMiddleware = responseFormatMiddleware
