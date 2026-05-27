import {useState} from "react";
import TaskFormulario from "./components/taskFormulario.jsx";
import TaskLista from "./components/taskLista.jsx";
import "./App.css";

function App(){
    const [refresh, setRefresh] = useState(0);

    const recargar = () => setRefresh((prev) => prev + 1);

    return(
        <>
            <h1>To Do List</h1>
            <TaskFormulario onTaskCreated={recargar} />
            <TaskLista refresh={refresh} onUpdate={recargar} />
        </>
    );
}

export default App;