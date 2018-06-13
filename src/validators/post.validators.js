const { check, body, header, param, validationResult, query } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');



module.exports = {

   getPostById: [
      param('id', 'No es un ID de post válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   createPost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      sanitize('title').trim().escape(),
      body('title', 'El título es requerido').exists(),
      body('title', 'El título debe entre 3 y 50 caracteres').isLength({ min: 3, max: 50 }),
      sanitize('body').trim().escape(),
      body('body', 'El contenido es requerido').exists(),
      body('body', 'El contenido debe tener 3 caracteres mínimo').isLength({ min: 3 }),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   likePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   dislikePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
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
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],

   deletePost: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      param('id', 'No es un ID de post válido').isMongoId(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
         }

         next();
      }
   ],


}