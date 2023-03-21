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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./usuario.entity");
const typeorm_2 = require("typeorm");
let UsuarioService = class UsuarioService {
    constructor(datasource) {
        this.datasource = datasource;
        this.usuarioRepository = this.datasource.getRepository(usuario_entity_1.UsuarioEntity);
    }
    find(opciones) {
        return this.usuarioRepository.find(opciones);
    }
    findOneById(id) {
        return this.usuarioRepository.findOne({
            where: {
                id: id
            },
            relations: ['renta']
        });
    }
    create(datosCrear) {
        return this.usuarioRepository.save(datosCrear);
    }
    update(datosActualizar, id) {
        return this.usuarioRepository.save(Object.assign(Object.assign({}, datosActualizar), { id }));
    }
    delete(id) {
        return this.usuarioRepository.delete(id);
    }
};
UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map