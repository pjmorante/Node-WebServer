const { Schema, model } = require('mongoose');

const CategoriaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

const Categoria = model('Categoria', CategoriaSchema);

module.exports = Categoria;
