// 3rd party Modules
const mongoose = require('mongoose');

// Mongoose settings (a partir de la version 5.2.9, esperando la 5.2.10)
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// Custom files
const app = require('./src/app');

// Environment
require('dotenv').config();

const port = process.env.PORT || 3000

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CLOUDDB_URI, { dbName: 'mean-blog-db', useNewUrlParser: true })
   .then(() => {
      console.log('Conectado a la db');
      // Start server una vez conectado a la db
      app.listen(port, () => {
         console.log(`Server escuchando en el puerto ${port}`);
      });
   },
      (err) => { console.log('Error al conectar a la db: ' + err); }
   );
