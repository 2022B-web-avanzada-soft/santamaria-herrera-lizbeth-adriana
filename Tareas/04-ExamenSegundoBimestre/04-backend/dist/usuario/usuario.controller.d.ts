import { UsuarioService } from "./usuario.service";
import { UsuarioCreateDto } from "./dto/usuario-create.dto";
import { UsuarioEntity } from "./usuario.entity";
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findOneById(params: any): Promise<UsuarioEntity>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
    update(params: any, bodyParams: any): Promise<{
        id: number;
        nombre_usuario: string;
        contrasena: string;
        rol: string;
    } & UsuarioEntity>;
    create(bodyParams: any): Promise<UsuarioCreateDto & UsuarioEntity>;
    find(queryParams: any): Promise<UsuarioEntity[]>;
}
