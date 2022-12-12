//08.promesas.js
const fs = require('fs')
//Hacer una funcion que acepte com parametro una variable
//del "path" del archivo y otra que acepte una variable con el "contenidoArchivo"
//Utilizar el modulo "fs" para leer el archivo en ese "path" y añadir el
//"cotenidoArchivo" a ese archivo


function promesaEscritura(nombreNuevoArchivo, nuevoContenido) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreNuevoArchivo,
                nuevoContenido,
                (errorEscritura) => {
                    if (errorEscritura) {
                        console.error(errorEscritura);
                        reject('Error escribiendo nuevo archivo');
                    } else {
                        resolve('Completado');
                    }
                }
            );
        }
    );
}

function ejercicio08(
    pathPrimerArchivo,
    pathSegundoArchivo,
    nombreNuevoArchivo
) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                pathPrimerArchivo, // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
                    if (errorLecturaPrimerArchivo) {
                        console.error(errorLecturaPrimerArchivo);
                        reject('Error leyendo primer archivo');
                    } else {
                        fs.readFile(
                            pathSegundoArchivo, // Nombre o path del archivo
                            'utf-8', // codificacion
                            (errorLecturaSegundoArchivo, contenidoSegundoArchivo) => {
                                if (errorLecturaSegundoArchivo) {
                                    console.error(errorLecturaSegundoArchivo);
                                    reject('Error leyendo segundo archivo');
                                } else {
                                    const nuevoContenido = contenidoPrimerArchivo + "\n" +contenidoSegundoArchivo;
                                    promesaEscritura(nombreNuevoArchivo, nuevoContenido);
                                }
                            }
                        );
                    }
                }
            );
        }
    )
}

ejercicio08("06-nuevo-archivo.js", "06-callbacks.js", "08-prueba-ejemploPromesas.js")