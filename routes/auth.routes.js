const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
  loginUsuario,
  googleSignIn,
} = require('../controllers/auth.controller');

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

router.post(
  '/google',
  [
    check('id_token', 'Token de Google es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);
module.exports = router;