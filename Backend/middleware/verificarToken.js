const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if(!token){
    return res.status(401).json({ message: "Necesitas iniciar sesión" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

module.exports = verificarToken;