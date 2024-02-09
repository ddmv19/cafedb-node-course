import { validationResult } from 'express-validator'

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
export const validaCampos = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).json(errors)

  next()
}




