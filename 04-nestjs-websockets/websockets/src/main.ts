import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(11201);
}
bootstrap();

//Modulo A
//[ModuloB, ModuloC]
//[Servicios]
//[Controladores]

//ModuloSoloServicios
//[Servicios]
//[exportar] -> [Servicios]

//ModuloSoloControlador
//[Controlador]

//ModuloControladoresServicios
//[ModuloSoloServicios] --> importa
//[Controlador]  --> se declara
//[Servicios]
//[exportar] -> [Servicios]

// Modulos contiene [Serivicios y controladores]
//Controlador --> Recibir las peticiones  --> Su responsabilidad es la VALIDACION
//Servicios --> LOGICA NEGOCIO (servicio es un singleton --> una sola instancia en todo el app)
                //(crear, borrar, actualizar, buscar,.....)

