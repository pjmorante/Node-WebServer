const { Role } = require('../models/role.model');
const { Usuario } = require('../models/usuario.modelo');

const isRoleValid = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
};

const emailExiste = async(email = '') => {

  const existeEmail = await Usuario.findOne({ email });
  if(existeEmail) {
    throw new Error(`El email: ${ email } ya esta registrado`);
  }
}

const usuarioExistePorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${ id } no existe`);
  }
};

module.exports = {
  isRoleValid,
  emailExiste,
  usuarioExistePorId,
};
