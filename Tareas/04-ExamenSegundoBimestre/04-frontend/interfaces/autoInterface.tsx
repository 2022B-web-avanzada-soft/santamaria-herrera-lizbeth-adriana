export interface AutoInterface {
    id?: number;
    auto_marca: string;
    auto_modelo: string;
    auto_num_puertas:number;
    auto_ultima_fecha_servicio?: string;
    auto_precio_dia: number;
    esta_rentado?: boolean;
    auto_imagen: string;
    usuarioLoginId?:string;
}