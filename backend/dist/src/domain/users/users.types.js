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
exports.GetUserByReqParamsDTO = exports.UserPostResDTO = exports.UserPostReqBodyDTO = void 0;
const class_transformer_1 = require("class-transformer");
class UserPostReqBodyDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostReqBodyDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostReqBodyDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostReqBodyDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UserPostReqBodyDTO.prototype, "has2faEnabled", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostReqBodyDTO.prototype, "otpSecret", void 0);
exports.UserPostReqBodyDTO = UserPostReqBodyDTO;
class UserPostResDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostResDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], UserPostResDTO.prototype, "has2faEnabled", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserPostResDTO.prototype, "name", void 0);
exports.UserPostResDTO = UserPostResDTO;
class GetUserByReqParamsDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GetUserByReqParamsDTO.prototype, "key", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], GetUserByReqParamsDTO.prototype, "value", void 0);
exports.GetUserByReqParamsDTO = GetUserByReqParamsDTO;
