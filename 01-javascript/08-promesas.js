//08.promesas.js
const fs = require('fs')
//Hacer una funcion que acepte com parametro una variable
//del "path" del archivo y otra que acepte una variable con el "contenidoArchivo"
//Utilizar el modulo "fs" para leer el archivo en ese "path" y añadir el
//"cotenidoArchivo" a ese archivo

///////////////////////////////PRIMER INTENTO/////////////////////
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

//ejercicio08("06-nuevo-archivo.js", "06-callbacks.js", "08-prueba-ejemploPromesas.js")

////////////////////////////////////////CORREGIDO/////////////////////////////////////
function leerArchivo(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path, // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLectura, contenido) => {
                    if (errorLectura) {
                        console.error(errorLectura);
                        reject('Error leyendo primer archivo');
                    } else {
                        resolve(contenido)
                    }
                }
            );
        }
    ); //
}

function escribirArchivo(path, nuevoContenido) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
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
    ); //
}

function ejercicio08(path, contenidoNuevo) {
    leerArchivo(path)
        .then(
            (contenidoArchivoOriginal) => {
                return escribirArchivo(
                    path, contenidoArchivoOriginal + contenidoNuevo
                )
            }
        )
        .then(
            (mensajeCreado) => {
                console.log(mensajeCreado);
            }
        )
        .catch((error) => console.error(error));
}

// ejercicio08('06-ejemplo.txt', ' :)  lo logramos!');



// ASYNC AWAIT
// REGLAS:
// 1) Estar dentro de una funcion (nombrada o anonima)
// 2) AGREGAR la palabra 'async' antes de la declaracion
//    de la funcion
// 3) AGREGAR la palabra 'await' antes de la declaracion
//    de una promesa
async function asyncAwaitUno(path, nuevoContenido) {
    // Si sabemos que en la promesa PUEDE haber un reject, usamos try y catch
    try {
        const respuestaContenidoArchivoOriginal = await leerArchivo(path);
        await escribirArchivo(path, respuestaContenidoArchivoOriginal + nuevoContenido );
        1 + 1; // caramelo
        leerArchivo().then().catch() // async
        await leerArchivo() // sync
        // await escribirArchivo(path, (await leerArchivo(path)) + nuevoContenido );
    } catch (error) {
        console.error(error);
    }
}
asyncAwaitUno('06-ejemplo.txt', ' :)  lo logramos!').then().catch()
const asyncAwaitDos = async function () {
}
const asyncAwaitTres = async () => {
}