import {IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import {Double} from "typeorm";

export class RentaUpdateDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    numeroDiasAlquiler: number;

    @IsOptional()
    @IsString()
    encargadoDelServicio: string;

    @IsOptional()
    @IsString()
    nombreDelRentador: string;

    @IsOptional()
    @IsString()
    metodoPago: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    totalPagar: Double;
}