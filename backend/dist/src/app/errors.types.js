"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.InvalidRequestException = exports.AlreadyExistsException = exports.NotFoundException = exports.UnauthorizedException = exports.APIError = void 0;
class APIError extends Error {
    constructor(type, statusCode, message) {
        super();
        this.type = type;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.APIError = APIError;
class UnauthorizedException extends APIError {
    constructor(message) {
        super('UnauthorizedException', 401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotFoundException extends APIError {
    constructor(message) {
        super('NotFoundException', 404, message);
    }
}
exports.NotFoundException = NotFoundException;
class AlreadyExistsException extends APIError {
    constructor(message) {
        super('AlreadyExistsException', 403, message);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;
class InvalidRequestException extends APIError {
    constructor(message) {
        super('InvalidRequestException', 400, message);
    }
}
exports.InvalidRequestException = InvalidRequestException;
class InternalError extends APIError {
    constructor() {
        super('InternalError', 500, 'Something went wrong');
    }
}
exports.InternalError = InternalError;
