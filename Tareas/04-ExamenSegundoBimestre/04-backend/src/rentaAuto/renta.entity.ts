import {Column, Double, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {AutoEntity} from "../auto/auto.entity";

@Entity('renta')
export class RentaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name: 'numero_dias_alquiler',   //nombre del campo de la bdd
        nullable: false,        //si es nulable
    })
    numeroDiasAlquiler: number; //nombre del objeto

    @Column({
        name: 'encargado_del_servicio',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    encargadoDelServicio: string;

    @Column({
        name: 'nombre_del_rentador',
        type: 'varchar',
        length: 60,
        nullable: false
    })
    nombreDelRentador: string;

    @Column({
        name: 'fecha_inicio_renta',
        type: 'varchar',
        length: 20,
        nullable: false
    })
    fecha_inicio_renta: string;

    @Column({
        name: 'metodo_pago',
        type: 'varchar',
        length: 30,
        nullable: false
    })
    metodoPago: string;

    @Column({
        name: 'total_a_pagar',
        type: 'double',
        nullable: false,
    })
    totalPagar: Double;

    @ManyToOne(
        () => UsuarioEntity, // Entidad Papa
        (instanciaUsuarioEntity) => // Campo Relacionado
            instanciaUsuarioEntity.renta)
    usuario: UsuarioEntity;


    @OneToOne(
        () => AutoEntity)
    @JoinColumn()
    auto: AutoEntity;
}