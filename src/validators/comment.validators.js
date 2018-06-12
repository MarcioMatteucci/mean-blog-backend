const { body, header, param, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

module.exports = {

   getCommentById: [
      param('id', 'No es un ID de comentario válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   likeComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   dislikeComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   updateComment: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de comentario válido').isMongoId(),
      sanitize('comment').trim(),
      sanitize('comment').escape(),
      body('comment', 'El comentario es requerido').exists(),
      body('comment', 'El comentario debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

}

