const { validationResult, header, body } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

module.exports = {

   getImageLoggedUser: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
         }

         next();
      }
   ],

   updateUserImage: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
         }

         next();
      }
   ],

   changePassword: [
      header('Authorization', 'Se debe proveer un Token').not().isEmpty(),
      sanitize('currentlyPassword').trim().escape(),
      body('currentlyPassword', 'La contraseña actual es requerida').exists(),
      body('currentlyPassword', 'La contraseña actual debe entre 6 y 30 caracteres').isLength({ min: 6, max: 30 }),
      body('currentlyPassword', 'La contraseña actual no puede tener caracteres especiales (solo letras y números)').isAlphanumeric(),
      sanitize('newPassword').trim().escape(),
      body('newPassword', 'La contraseña nueva es requerida').exists(),
      body('newPassword', 'La contraseña nueva debe entre 6 y 30 caracteres').isLength({ min: 6, max: 30 }),
      body('newPassword', 'La contraseña nueva no puede tener caracteres especiales (solo letras y números)').isAlphanumeric(),
      (req, res, next) => {
         const errors = validationResult(req);

         if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
         }

         next();
      }
   ],

}