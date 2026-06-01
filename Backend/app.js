var express = require('express');
var logger = require('morgan');

var taskRouter = require("./routes/tasksRoutes");
var driveRouter = require("./routes/driveRoutes");
var app = express();
app.listen(3000, ()=>{
    console.log('Funcionando en el puerto 3000')
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/tasks", taskRouter);
app.use("/files", driveRouter);

app.use(function(req, res, next) {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message
  });
});

module.exports = app;