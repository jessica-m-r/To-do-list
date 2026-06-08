import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService.js";
import TaskItem from "./taskItem.jsx";

function TaskLista({ refresh, onUpdate }) {
    const [tareas, setTareas] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        async function cargarTareas() {
            const respuesta = await getTasks(null);
            console.log("respuesta:", respuesta);
            if (!respuesta) return;
            const lista = respuesta.data?.map(tarea => ({
                id: tarea.id,
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                completado: tarea.completado
            })) || [];
            setTareas(lista);
            setCursor(respuesta.nextCursor);
            setHasMore(!!respuesta.nextCursor);
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