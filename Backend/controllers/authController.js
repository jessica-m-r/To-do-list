const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../firebase/firebase");
const User = require("../models/userModel");

async function register(req, res) {
  try {
    const { email, password, nombre } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "Email y password son requeridos" });
    }
    const snap = await database.ref("users").orderByChild("email").equalTo(email).once("value");
    if(snap.exists()){
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const passwordEncriptado = await bcrypt.hash(password, 8);
    const user = new User(email, passwordEncriptado, nombre || "");
    const ref = await database.ref("users").push(user);
    const token = jwt.sign({ uid: ref.key, email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.status(201).json({ accessToken: token });
  }catch (err){
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const snap = await database.ref("users").orderByChild("email").equalTo(email).once("value");
    if(!snap.exists()){
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    let uid, user;
    snap.forEach((child) => {
      uid = child.key;
      user = child.val();
    });

    const passwordCorrecto = await bcrypt.compare(password, user.password);
    if(!passwordCorrecto){
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ accessToken: token, nombre: user.nombre, email });
  }catch(err){
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

module.exports = { register, login };