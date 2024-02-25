const express = require('express')
const cookieParser = require('cookie-parser')
const port=3000
const app = express()
app.use(cookieParser())

function createCookies(req, res) {
    res.cookie('CookieHM', "Esta es una cookie hola mundo", {
        maxAge: 100000,
        httpOnly: false,//para que no lo manipule el navegador, sino solo la peticion
        secure: true,//solo en https
        sameSite: 'lax',
        expires: new Date("2024-02-29")
    })
    const agent = req.headers['user-agent']
    res.cookie('InfoNavegador', agent, {
        maxAge: 20000
    })
}

function deleteCookies(res) {
    res.clearCookie("CookieHM")
}

app.get('/', (req, res) => {

    res.send('Hello world')
})

app.get('/eliminarcookies', (req, res) => {

    res.send('Cookies eliminadas')
})

app.listen(port, ()=>{
    console.log('Escuchando puerto',port)
})
