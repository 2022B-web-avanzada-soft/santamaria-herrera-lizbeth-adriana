//04-funciones.js

function soloNumeros(a, b, c) {
    return a - b + c; // valores a devorlver
}

// JS permite el uso de funciones sin validaciones
// JS no es un lenguaje fuertemente tipado
// soloNumeros('v',true,[1,2,3])
// soloNumeros((a) => a,(a) => a,(a) => a);
// soloNumeros(1,2,3,4,5,6,7,8,9);
// soloNumeros();

function soloLetras(a, b, c) { //Sin return devolvemos: undefined
    console.log(a, b, c);
}


////TIPOS DE FUNCIONES/////

//Funciones nombradas - named functions
function funcionNombrada() {

}

//Funciones anonimas - anonymous functions  ==> pueden ejecutarse si estan guardadas en una variable
const funcionesSinNombre1 = function () {
};
var funcionesSinNombre2 = function () {
};
let funcionesSinNombre3 = function () {
};
[].forEach(function () {
});
funcionesSinNombre1();
funcionesSinNombre2();
funcionesSinNombre3();

//Funciones de flecha gorda => Fat arrow Functions
    //Se prefieren fat Arrow a las anonimas
const funcionFatArrow1 = () => {}; //-> =>
const funcionFatArrow2 = () => {};
const funcionFatArrow3 = () => {};
[].forEach(() => {
});
funcionFatArrow1();
funcionFatArrow2();
funcionFatArrow3();

const funcionFatArrow4 = () => {
};
const funcionFatArrow5 = (parametro) => {
    return parametro + 1;
};
const funcionFatArrow6 = parametro => parametro + 1; //Una sola linea, se omitio el return y las llaves. Solo si tenemos un parametro
const funcionFatArrow7 = (parametro) => parametro + 1;

const funcionFatArrow8 = (numUno, numDos, numTres) => numUno + numDos + numTres;

// ... => parametros infinitos => Legan en un arreglo de parametros
//        Solo podemos tener un parametro infinito por funcion

//function  sumarNumeros(a,b,c,d,e,... todosNumeros) --> esto esta bien ya que los parametros infinitos deben ir a l final
//function  sumarNumeros(... todosNumeros,a,b,c,d,e) --> BAD
function  sumarNumeros(... todosNumeros){//Parametros infinitos [1,3,5,6,7,8,9]
    let total = 0;
    todosNumeros.forEach(
        (valorActual) => {
            total = total + valorActual;
        }
    )
    return total;
    //return todosNumeros.redue((a,v) => a+v,0);
}
sumarNumeros(1,2,3,4,5,6,7,8,9,10,9,8)