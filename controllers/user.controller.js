const { response } = require('express');
const bcrypt = require('bcrypt');

const { Usuario } = require('../models/usuario.modelo')

const getUsers = async(req, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

const updateUser = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, google, email,...resto } = req.body;

  if(password){
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const createUser = async(req, res = response) => {

  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });  
  
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({ 
    usuario
 });
};

const deleteUser = async(req, res = response) => {
  
  const { id } = req.params;
  //Borrado fisicamente de la DB
  //const usuario = await Usuario.findByIdAndDelete(id);
  
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
  const usuarioAutenticado = req.usuario;
  
  res.json({ usuario, usuarioAutenticado });
};

module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser
}