import {IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";

export class AutoUpdateDto {
    @IsOptional()
    @IsString()
    auto_marca: string;

    @IsOptional()
    @IsString()
    auto_modelo: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    auto_num_puertas: number;

    @IsOptional()
    @IsString()
    auto_ultima_fecha_servicio: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    auto_precio_dia: number;

    @IsOptional()
    @IsBoolean()
    esta_rentado: boolean;

    @IsOptional()
    @IsString()
    auto_imagen: string;

}