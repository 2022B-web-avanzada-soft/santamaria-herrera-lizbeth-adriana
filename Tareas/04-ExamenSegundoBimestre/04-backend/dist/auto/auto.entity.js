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
exports.AutoEntity = void 0;
const typeorm_1 = require("typeorm");
let AutoEntity = class AutoEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AutoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_marca',
        type: 'varchar',
        length: 60,
        nullable: false,
    }),
    __metadata("design:type", String)
], AutoEntity.prototype, "auto_marca", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_modelo',
        type: 'varchar',
        length: 60,
        nullable: false,
    }),
    __metadata("design:type", String)
], AutoEntity.prototype, "auto_modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_num_puertas',
        nullable: false
    }),
    __metadata("design:type", Number)
], AutoEntity.prototype, "auto_num_puertas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_ultima_fecha_servicio',
        type: 'varchar',
        length: 20,
        nullable: false,
    }),
    __metadata("design:type", String)
], AutoEntity.prototype, "auto_ultima_fecha_servicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_precio_dia',
        type: 'double',
        nullable: false,
    }),
    __metadata("design:type", typeorm_1.Double)
], AutoEntity.prototype, "auto_precio_dia", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'esta_rentado',
        type: 'boolean',
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], AutoEntity.prototype, "esta_rentado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'auto_imagen',
        type: 'varchar',
        length: 200,
        nullable: false,
    }),
    __metadata("design:type", String)
], AutoEntity.prototype, "auto_imagen", void 0);
AutoEntity = __decorate([
    (0, typeorm_1.Entity)('auto')
], AutoEntity);
exports.AutoEntity = AutoEntity;
//# sourceMappingURL=auto.entity.js.map