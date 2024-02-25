const express = require('express');
const session = require('express-session');
const port = 3700;
const app = express();

app.use(session({
    user: 'admin',
    secret: '784rf8hes94k5=1ks',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    // Inicializamos la propiedad visitados en cada sesión
    if (!req.session.visitados) {
        req.session.visitados = {};
    }

    //capturamos la ruta actual
    const rutaActual = req.path;
    req.session.visitados[rutaActual] = req.session.visitados[rutaActual] || 0;
    req.session.visitados[rutaActual]++;

    if (req.session.visitados[rutaActual] === 3) {
        res.send(`<script>alert('Has visitado esta página 3 veces');</script>`);
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(`<p>Tu navegador es: ${userAgent}</p>`);
});

app.get('/query', (req, res) => {
    const query_user=req.query
    if(query_user.dato1){
        res.cookie("cookie1" , query_user.dato1,{maxAge:1000})
    }
    if(query_user.dato2){
        res.cookie("cookie2" , query_user.dato2,{maxAge:1000})
    }
    if(query_user.dato3){
        res.cookie("cookie3" , query_user.dato3,{maxAge:1000})
    }
    
    res.send('querys');
});

app.get('/videojuegos', (req, res) => {
    res.send('Pagina de videojuegos');
});

app.get('/deportes', (req, res) => {
    res.send('Pagina de deportes');
});

app.get('/cosmeticos', (req, res) => {
    res.send('Pagina de cosmeticos');
});

app.get('/comida', (req, res) => {
    res.send('Pagina de comida');
});

app.get('/historial', (req, res) => {
    let paginas = Object.keys(req.session.visitados).map(ruta => `${ruta}: ${req.session.visitados[ruta]}`).join('<br>');
    res.send(`Páginas consultadas: <br>${paginas}`);
});

app.listen(port, () => {
    console.log(`Escuchando puerto `,port);
});