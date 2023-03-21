import {IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";

export class AutoCreateDto {
    @IsNotEmpty()
    @IsString()
    auto_marca: string;

    @IsNotEmpty()
    @IsString()
    auto_modelo: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    auto_num_puertas: number;

    @IsOptional()
    @IsString()
    auto_ultima_fecha_servicio: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    auto_precio_dia: number;

    @IsNotEmpty()
    @IsBoolean()
    esta_rentado: boolean;

    @IsNotEmpty()
    @IsString()
    auto_imagen: string;

}