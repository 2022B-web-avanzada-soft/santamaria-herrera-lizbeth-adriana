import {IsIn, IsNotEmpty, IsString} from "class-validator";

export class UsuarioCreateDto {
    @IsNotEmpty()
    @IsString()
    nombre_usuario: string;

    @IsNotEmpty()
    @IsString()
    contrasena: string;

    @IsNotEmpty()
    @IsIn(['U', 'A'])
    rol: string;
}