//[idTodo].tsx

import Layout from "../../components/Layout";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from 'next/router'

interface ParametrosTodo{
    error?:string
    todo?: Todo;
}

// i_todos/hijos_todos/index.ts
// i_todos/hijos_todos/[idHijosTodos].ts
// http://localhost:3000/i_todos/hijos_todos/[idHijosTodos]

// i_todos/[idTodo]/hijos_todos/index.ts
// i_todos/[idTodo]/hijos_todos/[idHijosTodos].ts
// http://localhost:3000/i_todos/[idTodo]/hijos_todos/[idHijosTodos]

export default function (params: ParametrosTodo) {
    console.log(params)
    const router = useRouter()
    const {idTodo, nombre, apellido} =router.query
    console.log(idTodo, nombre, apellido)
    return(
        <Layout title={"To do's hijo"}>
            <h1> To do´s hijo {params?.todo.title}</h1>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async ()=>{
    //consulta de los id´s validos
    const paths =[
        {
            params:{idTodo:'1'},
        },
        {
            params:{idTodo:'2'},
        },
        {
            params:{idTodo:'4'},
        },
    ];
    return {paths, fallback:false}
}

//Codigo para cargar informacion EN EL SERVIDOR y enviar al CLIENTE

export const getStaticProps: GetStaticProps = async (
    {params}
) => {
    try{
        //fetch
        const id = params?.idTodo as string;
        const resultado = await TodoHttp(id);
        return {props:{todo:resultado}};
    }catch (err:any){
        return {props:{errors: err.message}}
    }
}
