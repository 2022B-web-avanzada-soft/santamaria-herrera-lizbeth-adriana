//05-desestructuración
    //Desestructuración de objetos  -> EL ORDEN SI IMPORTA

const adrian = {
    nombre: "Adrian",
};

const lizbeth ={
    nombre:"Lizbeth",
    apellido: "Santamaria"
};
const adrianLizbeth = { //Crea una nueva REFERENCIA (VALOR)
    ...adrian,  //El orden es importante, especialmente para propiedades que se repiten
    ...lizbeth, //como adrian y lizbeth tienen la misma variable nombre, se sobreescribe y permanece la ultima
};

console.log('adrianLizbeth', adrianLizbeth)


//DESTRUCTURAION DE ARREGLOS
const arregloUno = [1,2,3,4,5];
const arregloDos = [6,7,8,9,10];
const superArreglo = [
    ...arregloUno,
    ...arregloDos,
]; //[1,2,3,4,5,6,7,8,9,10]
console.log('superArreglo',superArreglo)