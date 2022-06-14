const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

  if(!req.usuario){
    return res.status(500).json({message: 'Se debe validar el token primero'})
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROL'){
    return res.status(401).json({message: `${ nombre } no tiene permiso de Administrador`})
  }
  
  next();
}

const tieneRole = ( ...roles ) => {

  return (req, res = response, next) => {

    if (!req.usuario) {
      return res
        .status(500)
        .json({ message: 'Se debe validar el token primero' });
    }

    if (!roles.includes(req.usuario.rol)){
      return res.status(401).json({ message: `El servicio require uno de estos roles: ${ roles }`})
    }
    
    next();
  };

}

module.exports = {
  esAdminRole,
  tieneRole,
};