import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RentaEntity} from "../rentaAuto/renta.entity";


@Entity('usuario') //nombre de la tabla en la bdd
export class UsuarioEntity{
    //id autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    //Columna en la bdd
    @Column({
        name: 'user_nombre',   //nombre del campo de la bdd
        type: 'varchar',        //tipo de campo bdd
        length: 60,             // longitud de campo bdd
        nullable: false,        //si es nulable
    })
    nombre_usuario: string; //nombre del objeto

    @Column({
        name: 'user_contraseña',
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    contrasena: string;

    @Column({
        name: 'user_rol',
        type: 'varchar',
        length: 1,
        nullable: false,
        default: 'U', //valor por defecto
        //Comentario en la base de datos
        comment: 'U = usuario; A = administrador;'
    })
    rol: string;

    @OneToMany(
        () => RentaEntity, // Entidad HIJA
        (instanciaRentaEntity) =>
            instanciaRentaEntity.usuario) // Campo Relacionado
    renta: RentaEntity[]
}