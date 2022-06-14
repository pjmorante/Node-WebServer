const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL'],
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: String,
    default: false
  }
});

usuarioSchema.methods.toJSON = function(){
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  Usuario,
};
