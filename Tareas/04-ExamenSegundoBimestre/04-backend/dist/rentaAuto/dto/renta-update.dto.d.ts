import { Double } from "typeorm";
export declare class RentaUpdateDto {
    numeroDiasAlquiler: number;
    encargadoDelServicio: string;
    nombreDelRentador: string;
    metodoPago: string;
    totalPagar: Double;
}
