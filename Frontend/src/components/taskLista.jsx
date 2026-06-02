import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService.js";
import TaskItem from "./taskItem.jsx";

function TaskLista({ refresh, onUpdate }) {
    const [tareas, setTareas] = useState([]);
    useEffect(() => {
        async function cargarTareas() {
            const datos = await getTasks();
            let lista = [];
            if (datos) {
                for (let id in datos) {
                    lista.push({
                        id: id,
                        titulo: datos[id].titulo,
                        descripcion: datos[id].descripcion,
                        completado: datos[id].completado
                    });
                }
            }
            setTareas(lista);
        }
        cargarTareas();
    }, [refresh]);
    if (tareas.length === 0) {
        return <p className="p-task">No hay tareas</p>;
    }
    return (
        <>
            {tareas.map((tarea) => (
                <TaskItem
                    key={tarea.id}
                    id={tarea.id}
                    titulo={tarea.titulo}
                    descripcion={tarea.descripcion}
                    completado={tarea.completado}
                    onUpdate={onUpdate}
                />
            ))}
        </>
    );
}

export default TaskLista;