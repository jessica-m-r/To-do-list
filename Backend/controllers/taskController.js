const crypto = require("crypto");
const database = require("../firebase/firebase");
const Task = require("../models/taskModel");

exports.task_list = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const limit = 5;
    const cursor = req.query.cursor;
    let query = database.ref(`users/${uid}/tasks`).orderByKey().limitToFirst(limit);
    if (cursor) query = query.startAfter(cursor);
    const snapshot = await query.get();
    if (!snapshot.exists()) return res.json({ data: [], nextCursor: null });
    const items = [];
    snapshot.forEach(child => {
      items.push({ id: child.key, ...child.val() });
    });
    const nextCursor = items.length === limit ? items[items.length - 1].id : null;
    const etag = `"${crypto.createHash('md5').update(JSON.stringify(items)).digest('hex')}"`;
    if (req.headers['if-none-match'] === etag) return res.status(304).end();
    res.set('ETag', etag);
    res.set('Cache-Control', 'no-cache');
    res.json({ data: items, nextCursor });
  } catch (error) {
    next(error);
  }
};
exports.task_create = async(req, res, next) => {
    try{
        const uid = req.user.uid;
        const {titulo, descripcion} = req.body;
        if(!titulo || !descripcion){
            return res.status(400).json({mensaje: "Título y descripción son requeridos"});
        }
        const task = new Task(titulo, descripcion, false);
        const taskReferencia = database.ref(`users/${uid}/tasks`).push();
        await taskReferencia.set(task);
        res.status(201).json({
            mensaje: "Tarea creada",
            id: taskReferencia.key,
            task,
        });
    }catch(error){
        next(error);
    }
};

exports.task_detail = async(req, res, next) => {
    try{
        const uid = req.user.uid;
        const {id} = req.params;
        const datos = await database.ref(`users/${uid}/tasks/${id}`).get();
        if(!datos.exists()){
            return res.status(404).json({mensaje: "Tarea no encontrada"});
        }
        res.json({
            id: datos.key,
            ...datos.val(),
        });
    }catch(error){
        next(error);
    }
};

exports.task_update = async(req, res, next) => {
    try{
        const uid = req.user.uid;
        const {id} = req.params;
        const {titulo, descripcion} = req.body;
        if(!titulo && !descripcion){
            return res.status(400).json({mensaje: "Debes proporcionar título o descripción para actualizar"});
        }
        const datos = await database.ref(`users/${uid}/tasks/${id}`).get();
        if(!datos.exists()){
            return res.status(404).json({mensaje: "Tarea no encontrada"});
        }
        const actualizacion = {};
        if(titulo) actualizacion.titulo = titulo;
        if(descripcion) actualizacion.descripcion = descripcion;
        await database.ref(`users/${uid}/tasks/${id}`).update(actualizacion);
        res.json({mensaje: "Tarea actualizada"});
    }catch(error){
        next(error);
    }
};

exports.task_complete = async(req, res, next) => {
    try{
        const uid = req.user.uid;
        const {id} = req.params;
        const datos = await database.ref(`users/${uid}/tasks/${id}`).get();
        if(!datos.exists()){
            return res.status(404).json({mensaje: "Tarea no encontrada"});
        }
        if(datos.val().completado){
            return res.status(400).json({mensaje: "La tarea ya fue completada"});
        }
        await database.ref(`users/${uid}/tasks/${id}`).update({completado: true});
        res.json({mensaje: "Tarea completada"});
    }catch(error){
        next(error);
    }
};

exports.task_delete = async(req, res, next) => {
    try{
        const uid = req.user.uid;
        const {id} = req.params;
        const datos = await database.ref(`users/${uid}/tasks/${id}`).get();
        if(!datos.exists()){
            return res.status(404).json({mensaje: "Tarea no encontrada"});
        }
        await database.ref(`users/${uid}/tasks/${id}`).remove();
        res.json({mensaje: "Tarea eliminada correctamente"});
    }catch(error){
        next(error);
    }
};