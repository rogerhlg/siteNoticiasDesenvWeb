var express = require('express');
const { request } = require('http');
var path = require('path');

var app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, './static')))

const dados = require('./dados/noticias.json');

const noticia = {
    titulo: "Rodovia de US$ 1 bilhão não leva a lugar nenhum em Montenegro (e pode quebrar o país europeu)",
    resumo: "Pequena nação nos Bálcãs, que tenta entrar na União Europeia, pegou empréstimo da China e ainda não concluiu trecho de apenas 41 km. Conselho Europeu alerta para 'armadilha da dívida'.",
    categoria: "Infraestrutura",
    foto: "alface.png"
}

const tabeladados = {
    mortes: "2.920.000",
    infectados:"135.000.000",
    recuperados:"79.800.000",
    vacinados:"980.000.000"
}


app.get(['/', '/index', '/home'], (req, res) => {
    res.render("index", { noticias: dados });
});

app.get("/noticias", (req, res) => {
    let id = req.params.id;
    let noticia = dados[id];
    res.render("noticias", {noticias: dados});
 });

app.get("/noticia/:id", (req, res) => {
    let id = req.params.id;
    let noticia = dados[id];
    res.render("noticia", {noticia: noticia});
 });

 app.get("/covid", (req, res) => {
    res.render("covid", {coviddados: tabeladados});
 });


app.listen(8000, function() {
    console.log('Servidor rodando!')
});


function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }