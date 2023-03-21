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
exports.RentaEntity = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("../usuario/usuario.entity");
const auto_entity_1 = require("../auto/auto.entity");
let RentaEntity = class RentaEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RentaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'numero_dias_alquiler',
        nullable: false,
    }),
    __metadata("design:type", Number)
], RentaEntity.prototype, "numeroDiasAlquiler", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'encargado_del_servicio',
        type: 'varchar',
        length: 60,
        nullable: false,
    }),
    __metadata("design:type", String)
], RentaEntity.prototype, "encargadoDelServicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'nombre_del_rentador',
        type: 'varchar',
        length: 60,
        nullable: false
    }),
    __metadata("design:type", String)
], RentaEntity.prototype, "nombreDelRentador", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fecha_inicio_renta',
        type: 'varchar',
        length: 20,
        nullable: false
    }),
    __metadata("design:type", String)
], RentaEntity.prototype, "fecha_inicio_renta", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'metodo_pago',
        type: 'varchar',
        length: 30,
        nullable: false
    }),
    __metadata("design:type", String)
], RentaEntity.prototype, "metodoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_a_pagar',
        type: 'double',
        nullable: false,
    }),
    __metadata("design:type", typeorm_1.Double)
], RentaEntity.prototype, "totalPagar", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, (instanciaUsuarioEntity) => instanciaUsuarioEntity.renta),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], RentaEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auto_entity_1.AutoEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", auto_entity_1.AutoEntity)
], RentaEntity.prototype, "auto", void 0);
RentaEntity = __decorate([
    (0, typeorm_1.Entity)('renta')
], RentaEntity);
exports.RentaEntity = RentaEntity;
//# sourceMappingURL=renta.entity.js.map