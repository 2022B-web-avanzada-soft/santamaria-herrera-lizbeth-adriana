"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const renta_entity_1 = require("./renta.entity");
const renta_service_1 = require("./renta.service");
const renta_controller_1 = require("./renta.controller");
let RentaModule = class RentaModule {
};
RentaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([renta_entity_1.RentaEntity]),
        ],
        providers: [renta_service_1.RentaService],
        exports: [renta_service_1.RentaService],
        controllers: [renta_controller_1.RentaController]
    })
], RentaModule);
exports.RentaModule = RentaModule;
//# sourceMappingURL=renta.module.js.map