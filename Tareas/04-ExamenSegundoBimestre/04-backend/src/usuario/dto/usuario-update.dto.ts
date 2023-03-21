import {IsIn, IsOptional, IsString} from "class-validator";

export class UsuarioUpdateDto {
    @IsOptional()
    @IsString()
    nombre_usuario: string;

    @IsOptional()
    @IsString()
    contrasena: string;

    @IsOptional()
    @IsIn(['U', 'A'])
    rol: string;
}