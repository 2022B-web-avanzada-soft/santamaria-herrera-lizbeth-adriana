//06-callbacks.js

const fs = require('fs'); //file system
//instalar modulo fs

//06-ejemplo.txt -> Hola
//console.log('PRIMERO');


fs.readFile(
    './06-ejemplo.txt', //Nombre o path del archivo
    'utf-8', //codificacion
    (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {        //Callback
        if (errorLecturaPrimerArchivo) {
            console.error(errorLecturaPrimerArchivo)
            throw new Error('Error leyendo primer archivo')
        } else {
            fs.readFile(
                './01-variables.js', // Nombre o path del archivo
                'utf-8',
                (errorLecturaSegundoArchivo, contenidoSegundoArchivo) => {
                    if (errorLecturaSegundoArchivo) {
                        console.error(errorLecturaSegundoArchivo)
                        throw new Error('Error leyendo segundo archivo');
                    } else {
                        const nuevoContenido = contenidoPrimerArchivo + "\n"+ contenidoSegundoArchivo;
                        fs.writeFile(
                            './06-nuevo-archivo.js', // Nombre o path del archivo
                            nuevoContenido,
                            (errorEscritura) => {
                                if (errorEscritura) {
                                    console.error(errorEscritura);
                                    throw new Error("Error ecribiendo nuevo archivo")
                                } else {
                                    console.log("Completado");
                                }
                            }
                        );
                    }
                }
            );
        }
    }
);

//console.log('TERCERO')

///Ejercicio
//1) Leer archivo: 01-variables.js, luego imprimir en consola
//3) Crear un nuevo archivo llamando 06-nuevo-archivo.js con el contenido del archivo 06-ejemplo.txt y 01-variables
//CODIGO PARA ESCRIBIR UN ARCHIVO
