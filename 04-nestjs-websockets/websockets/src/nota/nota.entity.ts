import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('epn_nota')
export class NotaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nota: number;
}