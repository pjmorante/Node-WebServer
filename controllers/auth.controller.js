const { response } = require('express');
const bcrypt = require('bcrypt');

const { Usuario } = require('../models/usuario.modelo');
const { generarJWT } = require('../helpers/generar-jwt')

const loginUsuario = async(req, res = response) => {

  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res
        .status(400)
        .json({ message: 'Email o contraseña no son correctos' });
    }

    //Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ message: 'Usuario inactivo' });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = await generarJWT(usuario.id);

    res.json({ 
      usuario, 
      token 
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hable con el administrador' });
  }

}

module.exports = {
  loginUsuario,
};