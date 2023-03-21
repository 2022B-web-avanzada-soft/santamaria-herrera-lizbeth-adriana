import {Column, Double, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RentaEntity} from "../rentaAuto/renta.entity";

@Entity('auto') //nombre de la tabla en la bdd
export class AutoEntity{
    //id autogenerado
    @PrimaryGeneratedColumn()
    id: number;

    //Columna en la bdd
    @Column({
        name: 'auto_marca',   //nombre del campo de la bdd
        type: 'varchar',        //tipo de campo bdd
        length: 60,             // longitud de campo bdd
        nullable: false,        //si es nulable
    })
    auto_marca: string; //nombre del objeto

    @Column({
        name: 'auto_modelo',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    auto_modelo: string;

    @Column({
        name: 'auto_num_puertas',
        nullable: false
    })
    auto_num_puertas: number;

    @Column({
        name: 'auto_ultima_fecha_servicio',
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    auto_ultima_fecha_servicio: string;

    @Column({
        name: 'auto_precio_dia',
        type: 'double',
        nullable: false,
    })
    auto_precio_dia: Double;

    @Column({
        name: 'esta_rentado',
        type: 'boolean',
        nullable: false,
    })
    esta_rentado: Boolean;

    @Column({
        name: 'auto_imagen',
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    auto_imagen: string;
}