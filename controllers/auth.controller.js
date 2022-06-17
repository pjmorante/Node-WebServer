const { response } = require('express');
const bcrypt = require('bcrypt');

const { Usuario } = require('../models/usuario.modelo');
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

  const { id_token } = req.body;

  try {
    const { nombre, img, email } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });

    if (!usuario){
      const data = {
        nombre,
        email,
        password: ':P',
        rol: 'USER_ROL',
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if(!usuario.estado) {
      return res.status(401).json({ msg: 'Usuario no existe, hable con el Administrador'})
    }

    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    res.status(400).json({ msg: 'El token no se pudo verificar'})
  }

  
}

module.exports = {
  loginUsuario,
  googleSignIn,
};