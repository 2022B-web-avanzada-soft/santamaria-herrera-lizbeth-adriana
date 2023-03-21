export interface UsuarioInterface {
    id: number;
    nombre_usuario: string;
    contrasena: string;
    rol:string;
    renta?:[];
}