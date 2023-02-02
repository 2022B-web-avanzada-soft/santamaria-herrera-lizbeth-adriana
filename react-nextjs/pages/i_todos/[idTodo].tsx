//[idTodo].tsx

import Layout from "../../components/Layout";
import {TodoHttp} from "../../servicios/http/todo.http";
import {GetStaticPaths, GetStaticProps} from "next";

export default function () {
    return(
        <Layout title={"To do's hijo"}>
            <h1>To do's hijo</h1>
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
