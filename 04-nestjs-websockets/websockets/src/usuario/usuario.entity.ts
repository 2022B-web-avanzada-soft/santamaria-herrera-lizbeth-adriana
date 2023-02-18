import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('epn_usuario') //nombre de la tabla en la bdd
export class UsuarioEntity{
    //id autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    //Columna en la bdd
    @Column({
        name: 'user_nombres',   //nombre del campo de la bdd
        type: 'varchar',        //tipo de campo bdd
        length: 60,             // longitud de campo bdd
        nullable: false,        //si es nulable
    })
    nombres: string; //nombre del objeto

    @Column({
        name: 'user_apellidos',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    apellidos: string;

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
}