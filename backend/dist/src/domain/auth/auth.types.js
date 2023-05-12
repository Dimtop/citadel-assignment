"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResDTO = exports.RegisterResDTO = exports.LoginReqBodyDTO = exports.RegisterReqBodyDTO = void 0;
const class_transformer_1 = require("class-transformer");
class RegisterReqBodyDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterReqBodyDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterReqBodyDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterReqBodyDTO.prototype, "password", void 0);
exports.RegisterReqBodyDTO = RegisterReqBodyDTO;
class LoginReqBodyDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginReqBodyDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginReqBodyDTO.prototype, "password", void 0);
exports.LoginReqBodyDTO = LoginReqBodyDTO;
class RegisterResDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterResDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterResDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], RegisterResDTO.prototype, "has2faEnabled", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterResDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RegisterResDTO.prototype, "qrCode", void 0);
exports.RegisterResDTO = RegisterResDTO;
class LoginResDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResDTO.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResDTO.prototype, "accessToken", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LoginResDTO.prototype, "refreshToken", void 0);
exports.LoginResDTO = LoginResDTO;
