//i_todos

import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";

export default function () {
    const [arregloTodos, setArregloTodos] = useState(
        [] as Todo[])
    useEffect( //Iniat el componente
        () => {
            //Consultar API...
            consultarTodos();
        },
        []
    )
    const consultarTodos = async () => {
        const resultado = await TodoHttp();
        setArregloTodos([
            ...arregloTodos,
            ...resultado
        ]);
    }
    return (
        <>
            <Layout title={"To do's"}>
                <h1>To do's</h1>
                {
                    arregloTodos.map(
                        (todo) => {
                            return (<li key={todo.id}>
                                {todo.id} - {todo.completed} -
                                <a href={'/i_todos/' + todo.id}>
                                    {todo.title}
                                </a>
                            </li>)
                        }
                    )
                }
            </Layout>
        </>
    )
}