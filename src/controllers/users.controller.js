const path = require('path');
const fs = require('fs');

const User = require('../models/user.model');
const authService = require('../services/auth.service');
const fileUploadService = require('../services/fileUpload.service');

module.exports = {

   /*=====================
   Crear una cuenta nueva
   =====================*/
   signUp: async (req, res) => {

      try {
         // Corro las 2 promesas en paralelo y espero q terminen ambas
         const [sameEmailUser, sameUsernameUser] = await Promise.all([
            User.findOne({ email: req.body.email.toLowerCase() }).exec(),
            User.findOne({ username: req.body.username }).exec()
         ]);

         // Valido que el email y el username no esten en uso
         if (sameEmailUser) {
            return res.status(422).json({ msg: 'El email está en uso' });
         }
         if (sameUsernameUser) {
            return res.status(422).json({ msg: 'El nombre de usuario está en uso' });
         }

         const hashedPassword = await authService.hashPassword(req.body.password);

         // Espero para q se cree el nuevo usuario
         const user = await new User({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email.toLowerCase(),
            role: req.body.role
         });

         // Corro las 2 promesas en paralelo y espero a q terminen ambas
         const [newUser, tokenInfo] = await Promise.all([
            user.save(),
            authService.signToken(user)
         ]);

         user.set({ password: ':)' });

         res.status(201).json({ msg: 'Usuario creado', user: newUser, tokenInfo });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al crear usuario', error: err });
      }

   },

   /*===============
   Login de usuario
   ===============*/
   signIn: async (req, res) => {

      try {
         // Espero hasta encontrar el usuario
         const user = await User.findOne({ username: req.body.username }).exec();

         if (!user) {
            return res.status(401).json({ msg: 'Nombre de usuario y/o contraseña incorrectos' });
         }

         // Espero hasta validar la password
         const isMatch = await user.isValidPassword(req.body.password);

         if (!isMatch) {
            return res.status(401).json({ msg: 'Nombre de usuario y/o contraseña incorrectos' });
         }

         // Espero hasta generar el token
         const tokenInfo = await authService.signToken(user);

         user.set({ password: ':)' });

         res.status(200).json({ msg: 'Login satisfactorio', user, tokenInfo });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al iniciar sesión', error: err });
      }

   },

   /*===============
   Refrescar Token
   ===============*/
   refreshToken: async (req, res) => {

      try {
         const user = await User.findById(req.body.userId).exec();

         const tokenInfo = await authService.signToken(user);

         user.set({ password: ':)' });

         res.status(200).json({ msg: 'Token refrescado', user, tokenInfo });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al refrescar el token', error: err });
      }

   },

   /*==================
   Chequea el Username
   ===================*/
   checkUsername: async (req, res) => {

      try {
         // Espero hasta encontrar (o no) al usuario
         const sameUsernameUser = await User.findOne({ username: req.query.username }).exec()

         if (sameUsernameUser) {
            return res.status(200).json({ isUsernameAvailable: false, msg: 'El nombre de usuario está en uso' });
         } else if (!sameUsernameUser) {
            return res.status(200).json({ isUsernameAvailable: true, msg: 'El nombre de usario está disponible' });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al buscar disponibilidad de nombre de usuario', error: err });
      }

   },

   /*================
   Chequea el Email
   =================*/
   checkEmail: async (req, res) => {

      try {
         // Espero hasta encontrar (o no) al usuario
         const sameEmailUser = await User.findOne({ email: req.query.email }).exec()

         if (sameEmailUser) {
            return res.status(200).json({ isEmailAvailable: false, msg: 'El email está en uso' });
         } else if (!sameEmailUser) {
            return res.status(200).json({ isEmailAvailable: true, msg: 'El email está disponible' });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al buscar disponibilidad de nombre de usuario', error: err });
      }

   },

   // Faltaria un endpoint para traer las imagenes de los usuarios
   // por su id, no solo la imagen del user q esta logeado.
   // Para mostrarlas en la info de los post, comments y rankings.
   /*====================================
   Obtener la imagen del usuario logeado
   ====================================*/
   getImageLoggedUser: async (req, res) => {

      try {
         // Como es una ruta con autenticacion el usuario ya viene
         // en el token, no necesito pasar el userId por params
         // ni validar que el usuario exista
         const user = await User.findById(req.body.userId).exec();

         res.sendFile(path.resolve(user.image));

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al obtener la imagen del usuario', error: err });
      }

   },

   // TODO
   /*===========================
   Obtener todos los usuarios
   ===========================*/
   getAllUsers: async (req, res) => {

   },

   // TODO
   /*===========================
   Obtener usuario por su Id
   ===========================*/
   getUserById: async (req, res) => {

   },

   // TODO
   /*================================
   Obtener imagen de usuario por user
   =================================*/
   getImageByUser: async (req, res) => {

   },

   /*==================================
   Actualizar imagen de perfil del user
   ===================================*/
   updateUserImage: async (req, res) => {

      try {
         // Valido que venga la imagen
         if (!req.files) {
            return res.status(422).json({ msg: 'La imagen es requerida' });
         }

         // Busco el usuario que viene en el token, seguro existe
         const user = await User.findById(req.body.userId).exec();

         // Elimino la imagen anterior
         if (fs.existsSync(user.image) && user.image !== './uploads/users/default-avatar.jpg') {
            // Ya tiene una imagen de usuario anterior
            fs.unlinkSync(user.image);
         }

         // Si viene la imagen espero hasta subirla y recibir el path (lo q se guarda en la db)
         const imagePath = await fileUploadService.uploadFile(req.files.image, user.username);

         user.image = imagePath;

         // Persisto
         await user.save();

         res.sendFile(path.resolve(user.image));

      } catch (err) {
         console.error(err);
         if (err.status) {
            res.status(err.status).json({ error: err.msg });
         } else {
            res.status(500).json({ msg: 'Error al actualizar la imagen de usuario', error: err });
         }
      }
   },

   /*============================
   Actualizar contraseña del user
   ============================*/
   changePassword: async (req, res) => {

      try {

         // El user viene del token, seguro existe
         const user = await User.findById(req.body.userId).exec();

         if (req.body.currentlyPassword === req.body.newPassword) {
            return res.status(422).json({ msg: 'Tu nueva contraseña debe ser distinta a la actual' });
         }

         const isMatch = await user.isValidPassword(req.body.currentlyPassword);

         if (!isMatch) {
            return res.status(422).json({ msg: 'Has ingresado una contraseña que no coincide con su contraseña actual' });
         }

         const hashedNewPassword = await authService.hashPassword(req.body.newPassword);
         user.password = hashedNewPassword;

         await user.save();

         res.status(200).json({ msg: 'Has actualizado tu contraseña, pruebala cuando vuelvas a logear' });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al acutalizar la contraseña del usuario', error: err });
      }

   }

}