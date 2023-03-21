import { RentaEntity } from "../rentaAuto/renta.entity";
export declare class UsuarioEntity {
    id: number;
    nombre_usuario: string;
    contrasena: string;
    rol: string;
    renta: RentaEntity[];
}
