const authService = require('../services/auth.service');

module.exports = {
   isAuth: async (req, res, next) => {

      // Saca el token del header de la request
      const token = await req.headers.authorization.split(" ")[1];

      // Pasa el token y ve como se resuelve la promesa
      await authService.verifyToken(token)
         .then(response => {
            req.body.userId = response;
            next()
         })
         .catch(response => {
            res.status(response.status).json({ msg: response.message });
         });
   },

   isAdmin: async (req, res, next) => {

      const token = await req.headers.authorization.split(" ")[1];

      await authService.verifyAdminToken(token)
         .then(response => {
            req.body.userId = response;
            next()
         })
         .catch(response => {
            res.status(response.status).json({ msg: response.message });
         })

   }

}