const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


const nunjucks = require ("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
// perd

// configura caminhos para aplicação
// pagina inicial
// req = requisição/require
// res = resposta/response

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    // re.query = Query Strings da nossa url
    // console.log(req.query)

    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body = o corpo do nosso formulario
    // console.log(req.body)

    // inserir dados no banco de dados

    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            )
             VALUES (?,?,?,?,?,?,?);
        `
               
        const values =  [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
    
    
        function afterIsertData(err) 
        {
            if (err) 
            {
                return console.log(err)
            }
    
            console.log("Cadastrado com Sucesso!")
            console.log(this)

            return res.render("create-point.html", { saved: true})
        }

        db.run(query, values, afterIsertData)
    
})




server.get("/search", (req, res) => {

    // buscando dados do banco de dados
    const search = req.query.search

    if(search == "") {
        return res.render("search-result.html", { total: 0 })
    }


    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // console.log(rows)
        // mostrar a pagina html com dados do banco de dados.
        return res.render("search-result.html", { places: rows, total: total })
    })
})

// ligando o servidor
server.listen(3000)
