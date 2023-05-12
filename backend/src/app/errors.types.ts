export class APIError extends Error {
  type: string
  statusCode: number
  message: string

  constructor(type: string, statusCode: number, message: string) {
    super()
    this.type = type
    this.statusCode = statusCode
    this.message = message
  }
}

export class UnauthorizedException extends APIError {
  constructor(message: string) {
    super('UnauthorizedException', 401, message)
  }
}

export class NotFoundException extends APIError {
  constructor(message: string) {
    super('NotFoundException', 404, message)
  }
}

export class AlreadyExistsException extends APIError {
  constructor(message: string) {
    super('AlreadyExistsException', 403, message)
  }
}

export class InvalidRequestException extends APIError {
  constructor(message: string) {
    super('InvalidRequestException', 400, message)
  }
}

export class InternalError extends APIError {
  constructor() {
    super('InternalError', 500, 'Something went wrong')
  }
}
