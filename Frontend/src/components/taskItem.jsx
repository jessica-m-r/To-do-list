import { useState } from "react";
import { updateTask, completeTask, deleteTask } from "../services/taskService.js";

function TaskItem({ id, titulo, descripcion, completado, onUpdate }) {

    const [editar, setEditar] = useState(false);
    const [newTitulo, setTitulo] = useState(titulo);
    const [newDescripcion, setDescripcion] = useState(descripcion);

    async function actualizar() {
        await updateTask(id, {
            titulo: newTitulo,
            descripcion: newDescripcion
        });
        setEditar(false);
        onUpdate();
    }
    async function completar() {
        await completeTask(id);
        onUpdate();
    }
    async function eliminar() {
        await deleteTask(id);
        onUpdate();
    }

    if (editar) {
        return (
            <div className="div-task">
                <input
                    type="text"
                    value={newTitulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    value={newDescripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button onClick={actualizar}>Guardar</button>
                <button onClick={() => setEditar(false)}>Cancelar</button>
            </div>
        );
    }
    return (
        <div className="div-task">
            <h3>{titulo}</h3>
            <p className="p-task">{descripcion}</p>
            <p className="p-task">
                {completado ? "Completada" : "Pendiente"}
            </p>
            {!completado && (
            <button onClick={completar}>Completar</button>
            )}
            <button onClick={() => setEditar(true)}>Editar</button>
            <button onClick={eliminar}>Eliminar</button>
        </div>
    );
}
export default TaskItem;