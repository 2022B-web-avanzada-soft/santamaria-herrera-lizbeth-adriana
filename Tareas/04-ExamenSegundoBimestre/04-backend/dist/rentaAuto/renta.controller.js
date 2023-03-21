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
exports.RentaController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const renta_service_1 = require("./renta.service");
const renta_update_dto_1 = require("./dto/renta-update.dto");
const renta_create_dto_1 = require("./dto/renta-create.dto");
let RentaController = class RentaController {
    constructor(rentaService) {
        this.rentaService = rentaService;
    }
    findOneById(params) {
        return this.rentaService.findOneById(+params.id);
    }
    delete(params) {
        return this.rentaService.delete(+params.id);
    }
    async update(params, bodyParams) {
        const nuevoRegistro = new renta_update_dto_1.RentaUpdateDto();
        nuevoRegistro.numeroDiasAlquiler = bodyParams.numeroDiasAlquiler;
        nuevoRegistro.encargadoDelServicio = bodyParams.encargadoDelServicio;
        nuevoRegistro.nombreDelRentador = bodyParams.nombreDelRentador;
        nuevoRegistro.metodoPago = bodyParams.metodoPago;
        nuevoRegistro.totalPagar = bodyParams.totalPagar;
        const arregloErrores = await (0, class_validator_1.validate)(nuevoRegistro);
        if (arregloErrores.length > 0) {
            console.error({ arregloErrores });
            throw new common_1.BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.rentaService.update(bodyParams, +params.id);
    }
    async create(bodyParams) {
        const nuevoRegistro = new renta_create_dto_1.RentaCreateDto();
        nuevoRegistro.numeroDiasAlquiler = bodyParams.numeroDiasAlquiler;
        nuevoRegistro.encargadoDelServicio = bodyParams.encargadoDelServicio;
        nuevoRegistro.nombreDelRentador = bodyParams.nombreDelRentador;
        nuevoRegistro.fecha_inicio_renta = bodyParams.fecha_inicio_renta;
        nuevoRegistro.metodoPago = bodyParams.metodoPago;
        nuevoRegistro.totalPagar = bodyParams.totalPagar;
        const arregloErrores = await (0, class_validator_1.validate)(nuevoRegistro);
        if (arregloErrores.length > 0) {
            console.error({ arregloErrores });
            throw new common_1.BadRequestException({
                mensaje: 'Envio mal datos'
            });
        }
        return this.rentaService.create(nuevoRegistro);
    }
    find(queryParams) {
        const consulta = {
            relations: ['auto']
        };
        const consultaWhere = [];
        if (queryParams.nombreDelRentador) {
            consultaWhere.push({
                nombreDelRentador: (0, typeorm_1.Like)('%' + queryParams.nombreDelRentador + '%'),
                numeroDiasAlquiler: queryParams.numeroDiasAlquiler,
                fecha_inicio_renta: queryParams.fecha_inicio_renta,
                metodoPago: queryParams.metodoPago,
                totalPagar: queryParams.totalPagar,
            });
        }
        if (consultaWhere.length > 0) {
            consulta.where = consultaWhere;
        }
        return this.rentaService.find(consulta);
    }
};
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RentaController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RentaController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RentaController.prototype, "find", null);
RentaController = __decorate([
    (0, common_1.Controller)('renta'),
    __metadata("design:paramtypes", [renta_service_1.RentaService])
], RentaController);
exports.RentaController = RentaController;
//# sourceMappingURL=renta.controller.js.map