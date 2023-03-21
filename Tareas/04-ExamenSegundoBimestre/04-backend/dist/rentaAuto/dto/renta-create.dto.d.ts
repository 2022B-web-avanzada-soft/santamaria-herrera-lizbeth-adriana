import { Double } from "typeorm";
export declare class RentaCreateDto {
    numeroDiasAlquiler: number;
    encargadoDelServicio: string;
    nombreDelRentador: string;
    fecha_inicio_renta: string;
    metodoPago: string;
    totalPagar: Double;
}
