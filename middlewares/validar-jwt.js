const jwt = require('jsonwebtoken');
const { response } = require('express');

const { Usuario } = require('../models/usuario.modelo');


const validarJWT = async(req, res = response, next) => {
  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({message: 'No hay token en la petición'})
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    
    const usuario = await Usuario.findById(uid);

     if (!usuario) {
       return res.status(401).json({ msg: 'Usuario no existe en DB' });
     }
    
    //Verificar si el usuario tiene estado true/activo
    if(!usuario.estado){
      return res.status(401).json({ msg: 'Usuario no existe'})
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token no válido' });
  }

}

module.exports = {
  validarJWT,
};