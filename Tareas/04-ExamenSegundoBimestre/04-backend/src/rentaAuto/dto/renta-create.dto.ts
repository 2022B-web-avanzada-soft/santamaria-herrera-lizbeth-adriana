import {IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import {Double} from "typeorm";

export class RentaCreateDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    numeroDiasAlquiler: number;

    @IsNotEmpty()
    @IsString()
    encargadoDelServicio: string;

    @IsNotEmpty()
    @IsString()
    nombreDelRentador: string;

    @IsNotEmpty()
    @IsString()
    fecha_inicio_renta: string;

    @IsNotEmpty()
    @IsString()
    metodoPago: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalPagar: Double;

}