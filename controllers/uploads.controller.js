const { response } = require('express'); //
const { subirArchivo } = require('../helpers');

const cargarArchivo = async( req, res = response ) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: 'No files were uploaded.'});
    return;
  }

  try {
    //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, 'imgs');

    res.json({
      nombre,
    });
  } catch (error) {
    res.status(400).json({ error });
  }  

}

module.exports = {cargarArchivo};

