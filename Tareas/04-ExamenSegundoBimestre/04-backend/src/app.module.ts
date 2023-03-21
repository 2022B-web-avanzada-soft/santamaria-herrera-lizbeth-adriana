import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {AutoEntity} from "./auto/auto.entity";
import {RentaEntity} from "./rentaAuto/renta.entity";
import {AutoModule} from "./auto/auto.module";
import {RentaModule} from "./rentaAuto/renta.module";

@Module({
  imports: [//Imports es donde importamos otros modulos
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './bdd/bdd.sqlite',
      entities: [
        UsuarioEntity,
        AutoEntity,
        RentaEntity
      ], // entidades de TODOO el aplicativo
      synchronize: true, //true => edita las columnas y tablas // false => nada
      dropSchema: false, //true => borra toda la base de datos! cuidado! // false => nada
    }),
    UsuarioModule,
    AutoModule,
    RentaModule
  ], //  Otros modulos - Agrupador
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
