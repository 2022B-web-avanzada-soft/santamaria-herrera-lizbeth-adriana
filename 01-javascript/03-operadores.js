//03-operadores

const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },

    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },

    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },


    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },


    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },


    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },


    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },

    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },


    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },


    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12


    }


];

//FUNCIONES CON PARAMETROS
//FIND
//Enviamos una expersion truty falsy
//devuelve el primero que cumpla esa condicion

const respuestaFind = arreglo.find(
    function (valorActual, indiceActual, arregloCompleto) {
        console.log('valorActual', valorActual);
        console.log('indiceActual', indiceActual);
        console.log('arregloCompleto', arregloCompleto);
        return valorActual.nombre === "Cristian"; //Expresion ===
    }
);

console.log('respuestaFind', respuestaFind); //Cristian //Si no encuentra devuelve undefined


//FINDINDEX
//Enviamos una expresion
//devuelve el indice del primero que cumpla esa condicion

const respuestaIndex = arreglo
    .findIndex(
        function (valorActual, indiceActual, arregloCompleto) {
            return valorActual.nombre === 'Cristian';
        }
    )
console.log('respuestaIndex', respuestaIndex); //Indice -> 6 //No encuentra -> -1


//FOREACH
//itera el arreglo

const respuestaForEach = arreglo
    .forEach(
        function (valorActual, indiceActual, arregloCompleto) {
            console.log('valorActual ', valorActual)
        }
    );

console.log('respuestaForEach', respuestaForEach) //undefined


//MAP(Modificar o MUTAR el arreglo y devuelve un nuevo arreglo
//enviamos los datos a un nuevo arreglo
//devuelve el nuevo arreglo
const respuestaMap = arreglo
    .map(
        (valorActual, indiceActual, arregloCompleto) => {
            const notaActual = valorActual.nota + 1;
            const nuevoElemento = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: notaActual,
                estaAprobado: notaActual > 14,
                casada: false,
            };
            return nuevoElemento;
        }
    )

console.log('respuestaMap', respuestaMap) //undefined
console.log('arreglo', arreglo) //undefined

//FILTER(filtrar el arreglo)
//enviamos EXPRESION TRUTY FALSY
//devuelve lso elementos que cumplen esa condicion

const respuestaFilter = arreglo
    .filter(
        (valorActual, indiceActual, arregloCompleto) => {
            return valorActual.nota >= 14;
        }
    );

console.log('respuestaFilter', respuestaFilter) //undefined
console.log('arreglo', arreglo) //undefined


//SOME
//DEVUELVE BOOLEANO
//Hay alguna nota nota menor a nueve? SI NO
//OR
const respuestaSome = arreglo
    .some(
        function (valorActual, indiceActual, arregloCompleto) {
            return valorActual.nota < 9;
        }
    );
console.log('respuestaSome', respuestaSome)

//EVERY -> expresion
//DEVUELVE BOOLEANO
//Todas las notas son mayores a 14? SI NO
//AND
const respuestaEvery = arreglo
    .every(
        function (valorActual, indiceActual, arregloCompleto) {
            return valorActual.nota > 14;
        }
    );
console.log('respuestaEvery', respuestaEvery)


//REDUCE            izq -> der
//REDUCE RIGHT      der -> izq
/////SUMA////
//[1,2,3,4,5,6,5,4,3,1]
//0 -> variable inicial
//0 + 1
//1 + 2
//3 + 3......

///RESTA///
//100 -> variable inicial
//100 - 1
//99 - 2
//98 - 3
const respuestaReduce = arreglo
    .reduce(
        function (valorAcumulado, valorActual, indiceActual, arregloCompleto) {
            return (valorAcumulado + valorActual.nota)
        },
        0 //Acumulador
    );
console.log('respuestaReduce', respuestaReduce); //146
console.log('promedio', respuestaReduce / arreglo.length) //14.6

arreglo.filter((a) => a.nota < 14)
    .map((e) => e.nota + 1)
    .some((e) => e > 14)