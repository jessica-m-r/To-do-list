import { useState } from "react";
import { updateTask, completeTask, deleteTask } from "../services/taskService.js";

function TaskItem(props){
    const [editar, setEditar] = useState(false);
    const [titulo, setTitulo] = useState(props.titulo);
    const [descripcion, setDescripcion] = useState(
        props.descripcion
    );

    async function actualizar(){
        await updateTask(
            props.id,
            {
                titulo: titulo,
                descripcion: descripcion
            }
        );
        setEditar(false);
        props.onUpdate();
    }
    async function completar(){
        await completeTask(props.id);
        props.onUpdate();
    }
    async function eliminar(){
        await deleteTask(props.id);
        props.onUpdate();
    }

    if(editar){
        return(
            <div>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e)=>{
                        setTitulo(e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e)=>{
                        setDescripcion(e.target.value);
                    }}
                />
                <button onClick={actualizar}>
                    Guardar
                </button>
                <button onClick={()=>{
                    setEditar(false);
                }}>
                    Cancelar
                </button>
            </div>
        );
    }

    return(
        <div>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
            <p>
                {
                    props.completado
                    ? "Completada"
                    : "Pendiente"
                }
            </p>
            {
                !props.completado &&
                <button onClick={completar}>
                    Completar
                </button>
            }
            <button onClick={()=>{setEditar(true);}}>
                Editar
            </button>
            <button onClick={eliminar}>Eliminar</button>
        </div>
    );
}
export default TaskItem;