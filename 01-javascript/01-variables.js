// 01-javascript
//      01-variables.js


// VARIABLES MUTABLES (reasiganadas =)
var numeroUno = 1;
let numeroDos = 2;
numeroUno = 12;
numeroDos = 8;
numeroUno = false;
numeroDos = true;

//VARIABLES INMUTABLES (no pueden reasignarse)
const configuracionDeArchivos = 'PDF';
//configuracionDeArchivos = 'XML'; --> no se pueden reasignar a variables de lectura o constantes
// Vamos a preferir CONST > LET > NUNCA VAR;

//TIPOS DE VARIABLES PRIMITIVAS
const numero = 1;              //number
const sueldo = 1.2;            //number
const texto = 'Lizbeth';       //String --> Se pueden usar comillas simples o dobles
const apellido = "Santamaria"; // String
const hijos = null;            // object
const zapatos = undefined;     //undefined

//Visualizar el tipo de dato
// console.log(typeof numero)
// console.log(typeof sueldo)
// console.log(typeof texto)
// console.log(typeof apellido)
// console.log(typeof hijos)
// console.log(typeof zapatos)


//Trusty Falsy

if ("") {
    console.log("String vacio Es verdadero")
} else {
    console.log("String vacio Es falsy")
}

if ("Lizbeth") {
    console.log("String Es verdadero") //truty
} else {
    console.log("String  Es falsy")
}

if (-1) {
    console.log("-1 Es verdadero") //truty
} else {
    console.log("-1 Es falsy")
}

if (0) {
    console.log("0 Es verdadero") //truty
} else {
    console.log("0 Es falsy")
}

if (1) {
    console.log("1 Es verdadero") //truty
} else {
    console.log("1 Es falsy")
}

if (null) {
    console.log("null Es verdadero") //truty
} else {
    console.log("null Es falsy")
}

if (undefined) {
    console.log("undefined Es verdadero") //truty
} else {
    console.log("undefined Es falsy")
}

// Orden nde importancia
// 1) const
// 2) let
// 3) x --> var


//JSON

const lizbeth = {
    "nombre": "Lizbeth", //llave:valor
    "apellido": "Santamaria",
    edad: 22,
    hijos: null,
    zapatos: undefined,
    casada: false,
    ropa: {
        color: "negro",
        talla: "38",
    },
    mascotas: ['kimba', 'Kuka', 'Nieve']
};

console.log(lizbeth)

///////////////////////////////////////////////Acceder a las propiedades///////////////////////////////////////////////
lizbeth.nombre;  //Lizbeth
lizbeth.apellido;   //Santamaria
lizbeth["nombre"];  //Lizbeth


///////////////////////////////////////////////ambiar valores///////////////////////////////////////////////
lizbeth.nombre = "Adriana";
lizbeth["nombre"] = "Lizbeth";

///////////////////////////////////////////////Crear nuevos atributos o metodos dentro del objeto///////////////////////////////////////////////
lizbeth.sueldo; //undefined
console.log(lizbeth.sueldo);
lizbeth.sueldo = 1.2;
console.log(lizbeth.sueldo) //1.2
lizbeth["gastos"] = 0.8
console.log(lizbeth.gastos) //0.8
console.log(lizbeth)

///////////////////////////////////////////////Borrar el valor de una propiedad///////////////////////////////////////////////
lizbeth.nombre =  undefined
console.log(lizbeth)
console.log(Object.keys(lizbeth))
console.log(Object.values(lizbeth))

///////////////////////////////////////////////DELETE la llave y el valor dentro del objeto///////////////////////////////////////////////
delete lizbeth.nombre
console.log(Object.keys(lizbeth))
console.log(lizbeth)


///////////////////////////////////////////////Variables por valor o referencia///////////////////////////////////////////////
//variables por valor en JS son las primitivas: number, string, boolean
let edadLiz = 22
let edadAdri = edadLiz  // Guardamos una primitiva en otra variable
                        // Variable por valor

console.log(edadLiz) //22
console.log(edadAdri) //22
edadLiz = edadLiz + 1
console.log(edadLiz) //23
console.log(edadAdri) //22

/////////////////////////////////////////////// Variables por referencia: Object ({},[])Variables por valor o referencia ///////////////////////////////////////////////
let notas = {
    total: 10
};

let notasSegundoBimestre = notas;
notasSegundoBimestre.total = notasSegundoBimestre.total + 1;
console.log('Notas: ', notas)
console.log('Notas Segundo Bimestre: ', notasSegundoBimestre)

/////////////////////////////////////////////// Clonar objetos
let notasTercerBimestre = Object.assign({},notas);

//Object.assign([],arreglo)
notasTercerBimestre.total = notasTercerBimestre.total + 1
console.log('Notas: ', notas)
console.log('Notas Segundo Bimestre: ', notasSegundoBimestre)
console.log('Notas Tercer Bimestre: ', notasTercerBimestre)
