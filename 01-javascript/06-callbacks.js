//06-callbacks.js

const fs = require('fs'); //file system
                            //instalar modulo fs

//06-ejemplo.txt -> Hola
//console.log('PRIMERO');

function escrituraArchivo(contenidoNuevoArchivo) {
    fs.writeFile("./06-nuevo-archivo.js", contenidoNuevoArchivo + "\n", (errorEscritura) => {
        if (errorEscritura) {
            console.error('ERROR LEYENDO ARCHIVO', errorLecturaNuevoArchivo)
        } else {
            console.log("The file was succesfully saved!");
        }
    });
}

fs.readFile(
    './06-ejemplo.txt', //Nombre o path del archivo
    'utf-8', //codificacion
    (errorLecturaPrimerArchivo,contenidoPrimerArchivo) =>{        //Callback
        if(errorLecturaPrimerArchivo){
            console.error('ERROR LEYENDO ARCHIVO', errorLecturaPrimerArchivo)
        }else{
            //console.log('Contenido 06-ejemplo.txt: ', contenidoPrimerArchivo)
            escrituraArchivo(contenidoPrimerArchivo);
        }
        console.log('SEGUNDO')
    }
);

//console.log('TERCERO')

///Ejercicio
//1) Leer archivo: 01-variables.js, luego imprimir en consola
//3) Crear un nuevo archivo llamando 06-nuevo-archivo.js con el contenido del archivo 06-ejemplo.txt y 01-variables
//CODIGO PARA ESCRIBIR UN ARCHIVO


fs.readFile(
    './01-variables.js', //Nombre o path del archivo
    'utf-8', //codificacion
    (errorLecturaSegundoArchivo,contenidoSegundoArchivo) =>{        //Callback
        if(errorLecturaSegundoArchivo){
            console.error('ERROR LEYENDO ARCHIVO', errorLecturaSegundoArchivo)
        }else{
            //console.log('Contenido 01 variables: ', contenidoSegundoArchivo)
            escrituraArchivo(contenidoSegundoArchivo);
        }
    }
);

//06-nuevo-archivo.js
fs.readFile(
    './06-nuevo-archivo.js', //Nombre o path del archivo
    'utf-8', //codificacion
    (errorLecturaSegundoArchivo,contenidoSegundoArchivo) =>{        //Callback
        if(errorLecturaSegundoArchivo){
            console.error('ERROR LEYENDO ARCHIVO', errorLecturaSegundoArchivo)
        }else{
            console.log('Contenido 06-nuevo-archivo.js: ', contenidoSegundoArchivo)
        }
    }
);