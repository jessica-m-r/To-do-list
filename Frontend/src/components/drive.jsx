import { useEffect, useState } from "react";
import { getFiles, uploadFile, deleteFile, downloadFile } from "../services/driveService";

function Drive() {
    const [files, setFiles] = useState([]);
    const [archivo, setArchivo] = useState(null);
    const [refresh, setRefresh] = useState(0);

    async function cargar() {
        const data = await getFiles();
        setFiles(Object.entries(data || {}));
    }

    useEffect(() => {
        cargar();
    }, [refresh]);

    async function subir(e) {
        e.preventDefault();
        if (!archivo) return alert("Selecciona un archivo");
        await uploadFile(archivo);
        setArchivo(null);
        e.target.reset();
        setRefresh(prev => prev + 1);
    }

    async function eliminar(id) {
        await deleteFile(id);
        setRefresh(prev => prev + 1);
    }

    return (
        <div>
            <form onSubmit={subir}>
                <input
                    type="file"
                    onChange={(e) => setArchivo(e.target.files[0])}
                />
                <button type="submit">Subir</button>
            </form>
            <div>
                {files.length === 0 && <p>No hay archivos</p>}
                {files.map(([id, file]) => (
                    <div key={id}>
                        <span>{file.titulo}</span>
                        <div>
                            <button onClick={() => downloadFile(id)}>Descargar</button>
                            <button onClick={() => eliminar(id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Drive;