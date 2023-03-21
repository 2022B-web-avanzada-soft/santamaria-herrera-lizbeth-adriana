import { Double } from "typeorm";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { AutoEntity } from "../auto/auto.entity";
export declare class RentaEntity {
    id: number;
    numeroDiasAlquiler: number;
    encargadoDelServicio: string;
    nombreDelRentador: string;
    fecha_inicio_renta: string;
    metodoPago: string;
    totalPagar: Double;
    usuario: UsuarioEntity;
    auto: AutoEntity;
}
