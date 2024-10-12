const express = require('express');
const nunjucks = require('nunjucks');

const fs = require('fs');

const app = express();
const router = require('./src/router');

// crea un middleware para manejar rutas estaticas
app.use('/css',express.static('public/css', {
    setHeaders: (res, path) => { 
      if (path.endsWith('.css')) {
        res.set("Content-Type", "text/css");
      }
    }
  }));

app.set('views', 'src/views');

// Configura el motor de plantillas
nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});


// Ruta para la página principal
/* app.get('/', (req, res) => {
  console.log('entro en la ruta /')
  const data = {
    title: 'Mi sitio web',
    menu: [
      { url: '/', text: 'Inicio' },
      { url: '/about', text: 'Acerca de' },
      { url: '/contact', text: 'Contacto' }
    ],
    body: '<h1 class="text-3xl font-bold text-center mt-4">Welcome to Tailwind CSS!</h1>',
    year: new Date().getFullYear(), 
    author: 'Zeteki Technology Innovations'
  };
  res.render('layout.html', data);
}); */

//middleware para compartir datos del layout
const compartirDatos = (req, res, next) => {
    console.log('entro al middleware compartir datos')
// Carga los datos que se compartirán entre las páginas
    const data = {
    title: "Mi sitio web",
    menu: [
      { url: "/", text: "Inicio" },
      { url: "/about", text: "Acerca de" },
      { url: "/login", text: "Login" },
    ],
    body: '<h1 class="text-3xl font-bold text-center mt-4">Welcome to Tailwind CSS!</h1>',
    year: new Date().getFullYear(),
    author: "Zeteki Technology Innovations",
  };

    req.data = { data };
    next();
  };

app.use(compartirDatos);


app.use(router);  //recuerda siempre mantener esto despues de los middlewares

//------INI:  Iniciar servidor ------- 
const port = 3000;
app.listen(port, () => {  
  console.log(`Servidor escuchando en el puerto ${port}`);
});
//------FIN:  Iniciar servidor -------