import { UsuarioEntity } from "./usuario.entity";
import { DataSource, FindManyOptions } from "typeorm";
import { UsuarioCreateDto } from "./dto/usuario-create.dto";
import { UsuarioUpdateDto } from "./dto/usuario-update.dto";
export declare class UsuarioService {
    datasource: DataSource;
    constructor(datasource: DataSource);
    usuarioRepository: import("typeorm").Repository<UsuarioEntity>;
    find(opciones: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]>;
    findOneById(id: number): Promise<UsuarioEntity>;
    create(datosCrear: UsuarioCreateDto): Promise<UsuarioCreateDto & UsuarioEntity>;
    update(datosActualizar: UsuarioUpdateDto, id: number): Promise<{
        id: number;
        nombre_usuario: string;
        contrasena: string;
        rol: string;
    } & UsuarioEntity>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
