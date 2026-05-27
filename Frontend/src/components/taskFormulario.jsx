import { useState } from "react";
import { createTask } from "../services/taskService.js";

function TaskFormulario(props){

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    async function guardarTarea(e){
        e.preventDefault();

        if(titulo === "" || descripcion === ""){
            alert("Complete los campos");
        }
        else{
            await createTask({
                titulo: titulo,
                descripcion: descripcion
            });

            setTitulo("");
            setDescripcion("");

            props.onTaskCreated();
        }
    }

    return(
        <form onSubmit={guardarTarea}>
            <input
                type="text"
                placeholder="Ingrese titulo"
                value={titulo}
                onChange={(e)=>{
                    setTitulo(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Ingrese descripcion"
                value={descripcion}
                onChange={(e)=>{
                    setDescripcion(e.target.value);
                }}
            />
            <button type="submit">Agregar</button>
        </form>
    );
}

export default TaskFormulario;