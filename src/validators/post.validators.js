const { body, header, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const checkErrors = require('../services/validation.service');

module.exports = {

   getPostById: [
      param('id', 'No es un ID de post válido').isMongoId(),
      checkErrors
   ],

   createPost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      sanitize('title').trim().escape(),
      body('title', 'El título es requerido').exists(),
      body('title', 'El título debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      sanitize('body').trim().escape(),
      body('body', 'El contenido es requerido').exists(),
      body('body', 'El contenido debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      checkErrors
   ],

   likePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      checkErrors
   ],

   dislikePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      checkErrors
   ],

   updatePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      sanitize('title').trim().escape(),
      body('title', 'El título es requerido').exists(),
      body('title', 'El título debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      sanitize('body').trim().escape(),
      body('body', 'El contenido es requerido').exists(),
      body('body', 'El contenido debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      checkErrors
   ],

   deletePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      checkErrors
   ],

}