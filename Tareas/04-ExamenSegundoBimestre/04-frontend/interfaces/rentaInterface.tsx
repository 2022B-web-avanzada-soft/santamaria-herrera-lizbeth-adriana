import {AutoInterface} from "./autoInterface";

export interface RentaInterface {
    id?: number;
    numeroDiasAlquiler: number;
    encargadoDelServicio: string;
    nombreDelRentador: string;
    fecha_inicio_renta: string;
    metodoPago: string;
    totalPagar: number;
    usuarioId?:number;
    autoId?: number;
    auto?:AutoInterface;
    usuarioLoginId?:string;
}