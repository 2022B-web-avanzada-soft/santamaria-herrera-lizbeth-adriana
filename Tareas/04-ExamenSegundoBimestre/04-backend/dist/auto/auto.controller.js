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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const auto_service_1 = require("./auto.service");
const auto_create_dto_1 = require("./dto/auto-create.dto");
const auto_update_dto_1 = require("./dto/auto-update.dto");
let AutoController = class AutoController {
    constructor(autoService) {
        this.autoService = autoService;
    }
    findOneById(params) {
        return this.autoService.findOneById(+params.id);
    }
    delete(params) {
        return this.autoService.delete(+params.id);
    }
    async update(params, bodyParams) {
        const nuevoRegistro = new auto_update_dto_1.AutoUpdateDto();
        nuevoRegistro.auto_marca = bodyParams.auto_marca;
        nuevoRegistro.auto_modelo = bodyParams.auto_modelo;
        nuevoRegistro.auto_num_puertas = bodyParams.auto_num_puertas;
        nuevoRegistro.auto_ultima_fecha_servicio = bodyParams.auto_ultima_fecha_servicio;
        nuevoRegistro.auto_precio_dia = bodyParams.auto_precio_dia;
        nuevoRegistro.esta_rentado = bodyParams.esta_rentado;
        nuevoRegistro.auto_imagen = bodyParams.auto_imagen;
        const arregloErrores = await (0, class_validator_1.validate)(nuevoRegistro);
        if (arregloErrores.length > 0) {
            console.error({ arregloErrores });
            throw new common_1.BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.autoService.update(bodyParams, +params.id);
    }
    async create(bodyParams) {
        const nuevoRegistro = new auto_create_dto_1.AutoCreateDto();
        nuevoRegistro.auto_marca = bodyParams.auto_marca;
        nuevoRegistro.auto_modelo = bodyParams.auto_modelo;
        nuevoRegistro.auto_num_puertas = bodyParams.auto_num_puertas;
        nuevoRegistro.auto_ultima_fecha_servicio = bodyParams.auto_ultima_fecha_servicio;
        nuevoRegistro.auto_precio_dia = bodyParams.auto_precio_dia;
        nuevoRegistro.esta_rentado = bodyParams.esta_rentado;
        nuevoRegistro.auto_imagen = bodyParams.auto_imagen;
        const arregloErrores = await (0, class_validator_1.validate)(nuevoRegistro);
        if (arregloErrores.length > 0) {
            console.error({ arregloErrores });
            throw new common_1.BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.autoService.create(nuevoRegistro);
    }
    find(queryParams) {
        const consulta = {
            skip: queryParams.skip,
            take: queryParams.take
        };
        const consultaWhere = [];
        if (queryParams.auto_marca) {
            consultaWhere.push({
                auto_marca: (0, typeorm_1.Like)('%' + queryParams.auto_marca + '%'),
                auto_modelo: queryParams.auto_modelo,
                auto_num_puertas: queryParams.auto_num_puertas,
                auto_ultima_fecha_servicio: queryParams.auto_ultima_fecha_servicio,
                auto_precio_dia: queryParams.auto_precio_dia,
                esta_rentado: queryParams.esta_rentado,
                auto_imagen: queryParams.auto_imagen,
            });
        }
        if (consultaWhere.length > 0) {
            consulta.where = consultaWhere;
        }
        return this.autoService.find(consulta);
    }
};
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutoController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutoController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AutoController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AutoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutoController.prototype, "find", null);
AutoController = __decorate([
    (0, common_1.Controller)('auto'),
    __metadata("design:paramtypes", [auto_service_1.AutoService])
], AutoController);
exports.AutoController = AutoController;
//# sourceMappingURL=auto.controller.js.map