import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RentaEntity} from "./renta.entity";
import {RentaService} from "./renta.service";
import {RentaController} from "./renta.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [RentaEntity], // Entidad en este modulo
        ),
    ],
    providers:[RentaService],
    exports: [RentaService],
    controllers: [RentaController]
})
export class RentaModule{

}