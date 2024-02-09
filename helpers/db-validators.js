import Role from '../models/role.js'
import Usuario from '../models/usuario.js'

export const esRolValido = async (rol = '') => {
  const existeRol = await Role.findOne({rol})
  if(!existeRol) throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({correo})
  if(existeEmail) throw new Error(`El correo ${correo} ya se encuentra registrado en la bd`)
}

export const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id)
  if(!existeUsuario) throw new Error(`El id no existe ${id}`)
}