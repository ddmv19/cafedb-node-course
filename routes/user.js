import { Router } from 'express'
import { check } from 'express-validator'
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from '../controllers/user.js'
import { validaCampos } from '../middlewares/validar-campos.js'
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js'

export const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRolValido),
  validaCampos
],usuariosPut)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener mínimo 6 letras').isLength({ min: 6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRolValido),
  validaCampos
], usuariosPost)

router.delete('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validaCampos
],usuariosDelete)

router.patch('/', usuariosPatch)
