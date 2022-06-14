const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { loginUsuario } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  loginUsuario
);

module.exports = router;