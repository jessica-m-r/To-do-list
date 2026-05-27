import { useState } from "react";
import { updateTask, completeTask, deleteTask } from "../services/taskService.js";

function TaskItem(task){
    const [editar, setEditar] = useState(false);
    const [titulo, setTitulo] = useState(task.titulo);
    const [descripcion, setDescripcion] = useState(
        task.descripcion
    );

    async function actualizar(){
        await updateTask(
            task.id,
            {
                titulo: titulo,
                descripcion: descripcion
            }
        );
        setEditar(false);
        task.onUpdate();
    }
    async function completar(){
        await completeTask(task.id);
        task.onUpdate();
    }
    async function eliminar(){
        await deleteTask(task.id);
        task.onUpdate();
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
            <h3>{task.titulo}</h3>
            <p>{task.descripcion}</p>
            <p>
                {
                    task.completado
                    ? "Completada"
                    : "Pendiente"
                }
            </p>
            {
                !task.completado &&
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