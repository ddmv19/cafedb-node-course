import bcrypt from 'bcryptjs'
import Usuario from '../models/usuario.js'

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const usuariosGet = async (req, res) => {
  // Para los parametros (Query Params) de la URL /users?param1=1&param2=2
  // const { q, nombre, apiKey } = req.query  
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios    
  })
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const usuariosPut = async (req, res) => {
  // "params" para recuperar el parametro que nos envian desde la URL que puede recibir
  const id = req.params.id
  const { _id ,password, google, correo, ...resto } = req.body
  if(password) {
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync()
    resto.password = bcrypt.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)
  res.json({
    usuario
  })
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const usuariosPost = async (req, res) => {
  // body para obtener los datos que nos envian/recibe nuetro server
  const { nombre, correo, password, rol, ...resto } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol })
  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync()
  usuario.password = bcrypt.hashSync(password, salt)
  //Guardar en DB
  await usuario.save()

  res.json({
    message: 'post API',
    usuario,
  })
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const usuariosDelete = async (req, res) => {
  const { id } = req.params

  //Borramos fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id)

  //Manera recomendada
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

  res.json({
    usuario
  })
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const usuariosPatch = (req, res) => {
  res.json({
    message: 'patch API',
  })
}
