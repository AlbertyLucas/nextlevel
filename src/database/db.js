// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// cria o projeto do banco de dados (operações)

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

// utilizar o objeto de banco de dados para a funcção.

db.serialize(() => {
//     // crie uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // Inserir dados na tablea
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values =  [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     "Papersider",
//     "Guilherme Gembala, Jardin America",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papeis e Papelão"
//     ]

 
//     function afterIsertData(err) 
//     {
//         if (err) 
//         {
//             return console.log(err)
//         }

//         console.log("Cadastrado com Sucesso!")
//         console.log(this)
//     }

//     db.run(query, values, afterIsertData)
   
//     //  // Consultar os dados da tabela
//     //  db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })
    

//     // deletar dado da tabela/ somente um exemplo abaixo

    db.run(`DELETE FROM places WHERE id = ?`, [11], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })

   
})