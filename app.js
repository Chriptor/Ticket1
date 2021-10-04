const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); 

const app = express();

app.use(express.json())
app.use(cors());

app.set('view engine','ejs');
app.set('views', __dirname + '/view');
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const uriMongo = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0.q8rfj.mongodb.net/${process.env.DB_DB}?retryWrites=true&w=majority`

async function serverStart() {
    mongoose.connect(uriMongo,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
            
        }).then(r => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor Iniciado en el puerto " + process.env.PORT)
            console.log("conctado a db "+ uriMongo)
        })
    }).catch(error => {
        console.log(error)
        console.log("No pude conectar a la base de datos")
    })
}

serverStart();

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/Ofertas', (req, res) => {
    res.render("Ofertas")
})
app.get('/LogIn', (req, res) => {
    res.render("LogIn")
})
app.use((req, res, next) => {
    res.status(404).render("404")
})
//Iniciamos vistas



