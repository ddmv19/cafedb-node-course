// {
//   nombre: 'asd',
//   correo: 'asdsa@asdad.com',
//   password: 'qafdasfd',
//   img: 'fsgdfgfhdf',
//   rol: 'asdas',
//   estado: true,
//   google: false,
// }

import { Schema, model } from 'mongoose'

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    uniqued: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

// Usamos una función normal porque vamos a necesitar el "this"
UsuarioSchema.methods.toJSON = function() {
  const { __v, password, ...usuario } = this.toObject()
  return usuario
}

export default model('Usuario', UsuarioSchema)