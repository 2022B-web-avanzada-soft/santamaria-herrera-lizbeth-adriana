import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [UsuarioEntity], // Entidad en este modulo
        ),
    ],
    providers:[UsuarioService],
    exports: [UsuarioService],
    controllers: [UsuarioController]
})
export class UsuarioModule{

}