import { useEffect, useState, useCallback } from "react";
import { getTasks } from "../services/taskService.js";
import TaskItem from "./taskItem.jsx";

function TaskLista({ refresh, onUpdate }) {
    const [tareas, setTareas] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const cargarTareas = useCallback(async (cursor, append = false) => {
        setLoading(true);
        try{
            const respuesta = await getTasks(cursor);
            const nuevasTareas = respuesta.data.map(tarea => ({
                id: tarea.id,
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                completado: tarea.completado
            }));
            if(append){
                setTareas(prev => {
                    const idsExistentes = new Set(prev.map(t => t.id));
                    const unicas = nuevasTareas.filter(t => !idsExistentes.has(t.id));
                    return [...prev, ...unicas];
                });
            }else{
                setTareas(nuevasTareas);
            }

            setNextCursor(respuesta.nextCursor);
            setHasMore(!!respuesta.nextCursor);
        }catch(error){
            console.error(error);
        }finally{
            setLoading(false);
        }
    }, []);

    useEffect(() =>{
        cargarTareas(null, false);
    }, [refresh, cargarTareas]);

    const cargarMas = () => {
        if(!loading && hasMore && nextCursor){
            cargarTareas(nextCursor, true);
        }
    };

    if(tareas.length === 0 && !loading){
        return <p className="p-task">No hay tareas</p>;
    }

    return (
        <>
            {tareas.map((tarea) =>(
                <TaskItem
                    key={tarea.id}
                    id={tarea.id}
                    titulo={tarea.titulo}
                    descripcion={tarea.descripcion}
                    completado={tarea.completado}
                    onUpdate={onUpdate}
                />
            ))}
            {hasMore &&(
                <button onClick={cargarMas} disabled={loading}>
                    {loading ? "Cargando..." : "Cargar más"}
                </button>
            )}
        </>
    );
}

export default TaskLista;