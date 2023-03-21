import { Double } from "typeorm";
export declare class AutoEntity {
    id: number;
    auto_marca: string;
    auto_modelo: string;
    auto_num_puertas: number;
    auto_ultima_fecha_servicio: string;
    auto_precio_dia: Double;
    esta_rentado: Boolean;
    auto_imagen: string;
}
