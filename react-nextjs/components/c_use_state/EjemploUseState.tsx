//componentes/c_use_state/EjemplosUseState.tsx

import {useEffect, useState} from "react";
interface  Usuario{
    nombre: string;
    edad: number;
    casado: boolean;
    hijos?:number[];
}
export default function () {
    const [numero, setNumero] = useState(0);
    const [nombre, setNombre] = useState("");
    const [arregloNumeros, setArregloNumeros] = useState([1,2,3] as number[]);
    const [usuario, setUsuario] = useState({
        nombre: "Lizbeth",
        edad: 22,
        casado: false,
    }as Usuario)

    //Nos ayuda a escuchar cambios de las variables
    useEffect(
        ()=>{
            console.log('Cambio numero', numero)
        },
        [numero] //Arreglo de las variables
        //Si sel arreglo esta vacio se sejecuta al principio una vez
    )

    useEffect(
        ()=>{
            console.log('Cambio ArregloNumero', arregloNumeros)
        },
        [arregloNumeros] //Arreglo de las variables
    )

    useEffect(
        ()=>{
            console.log('Cambio usuario', usuario)
        },
        [usuario] //Arreglo de las variables
    )

    useEffect(
        ()=>{
            console.log('Cambio todo', numero, arregloNumeros, usuario)
        },
        [numero, arregloNumeros, usuario] //Arreglo de las variables
    )

    return (<>
        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault();
            setNumero(numero+1);
        }}
        >
            Numero</button>

        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault();
            setArregloNumeros([...arregloNumeros,1]);
        }}
        >
            Arreglo</button>

        <button className="bg-blue-500 m-2" onClick={(event)=>{
            event.preventDefault();
            let UsuarioNuevo ={...usuario, nombre: new Date().toString()};//sobreescribimos el nombre
            setUsuario(UsuarioNuevo);
        }}
        >
            Usuario</button>

    </>)
}