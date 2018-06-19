const { body, header, param } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const checkErrors = require('../services/validation.service');

module.exports = {

   getCommentById: [
      param('id', 'No es un ID de comentario válido').isMongoId(),
      checkErrors
   ],

   likeComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      checkErrors
   ],

   dislikeComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      checkErrors
   ],

   updateComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      sanitize('comment').trim(),
      sanitize('comment').escape(),
      body('comment', 'El comentario es requerido').exists(),
      body('comment', 'El comentario debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      checkErrors
   ],

   createComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      sanitize('comment').trim().escape(),
      body('comment', 'El comentario es requerido').exists(),
      body('comment', 'El comentario debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      checkErrors
   ],

   getCommentsByPost: [
      param('id', 'No es un ID de post válido').isMongoId(),
      checkErrors
   ],

   deleteComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('postId', 'No es un ID de post válido').isMongoId(),
      param('commentId', 'No es un ID de comentario válido').isMongoId(),
      checkErrors
   ],
}

