const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const {
  isRoleValid,
  emailExiste,
  usuarioExistePorId,
} = require('../helpers/db-validators');

const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(isRoleValid),
    validarCampos,
  ],
  updateUser
);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener minimo 6 caracteres').isLength({
      min: 6,
    }),
    check('email', 'Email no valido').isEmail(),
    check('email').custom(emailExiste),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isRoleValid),
    validarCampos,
  ],
  createUser
);

router.delete(
  '/:id',
  [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;