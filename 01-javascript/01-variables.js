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
console.log(typeof numero)
console.log(typeof sueldo)
console.log(typeof texto)
console.log(typeof apellido)
console.log(typeof hijos)
console.log(typeof zapatos)