import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AutoEntity} from "./auto.entity";
import {AutoService} from "./auto.service";
import {AutoController} from "./auto.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [AutoEntity], // Entidad en este modulo
        ),
    ],
    providers:[AutoService],
    exports: [AutoService],
    controllers: [AutoController]
})
export class AutoModule{

}