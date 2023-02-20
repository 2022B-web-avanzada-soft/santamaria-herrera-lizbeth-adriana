const fs = require('fs')

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

function guardarDatos(path, contenidoNuevo) {
    leerArchivo(path)
        .then(
            (contenidoArchivoOriginal) => {
                return escribirArchivo(
                    //path, contenidoArchivoOriginal + contenidoNuevo
                    path, contenidoNuevo
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

module.exports = {
    "leerArchivo": leerArchivo,
    "escribirArchivo": escribirArchivo,
    "guardarDatos": guardarDatos
}