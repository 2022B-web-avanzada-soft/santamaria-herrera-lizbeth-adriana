//componentes/c_use_state/EjemplosUseState.tsx

import {useState} from "react";
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
    setUsuario({nombre: "Adriana", edad: 21, casado: true,hijos:[]})

    return (<>
        <button className="bg-blue-500" onClick={(event)=>{
            event.preventDefault();
            setNumero(numero+1);
        }}
        >
            Numero</button>

        <button className="bg-blue-500" onClick={(event)=>{
            event.preventDefault();
            setArregloNumeros([...arregloNumeros,1]);
        }}
        >
            Arreglo</button>

        <button className="bg-blue-500" onClick={(event)=>{
            event.preventDefault();
            let UsuarioNuevo ={...usuario, nombre: new Date().toString()};//sobreescribimos el nombre
            setUsuario(UsuarioNuevo);
        }}
        >
            Usuario</button>

    </>)
}