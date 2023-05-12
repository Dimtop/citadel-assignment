"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_instance_1 = require("./src/db/db-instance");
const response_format_middleware_1 = require("./src/app/response-format.middleware");
const error_middlewrate_1 = require("./src/app/error.middlewrate");
const auth_router_1 = __importDefault(require("./src/domain/auth/auth.router"));
const cors_1 = __importDefault(require("cors"));
const teams_router_1 = __importDefault(require("./src/domain/teams/teams.router"));
db_instance_1.DBInstance.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    dotenv_1.default.config();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(response_format_middleware_1.responseFormatMiddleware);
    app.use('/auth', auth_router_1.default);
    app.use('/teams', teams_router_1.default);
    app.get('*', function (req, res) {
        res.status(404).send('Handler not found');
    });
    app.use(error_middlewrate_1.errorMiddleware);
    app.listen(process.env.PORT || 5013, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}))
    .catch((error) => {
    console.log(error);
});
