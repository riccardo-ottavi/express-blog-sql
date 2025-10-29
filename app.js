// importo il framework express
const express = require("express");
// creiamo un istanza di express
const app = express();
// impostiano un ref per il numero della porta
const port = 3000;

// importiamo modulo router i post
const postRouter = require("./routers/posts")

//importo middleware notFound
const notFound = require("./middlewares/notFound")

//importo middleware errorServer
const errorServer = require("./middlewares/errorServer")


// usiamo il middleware static di express (per rendere disponibile i file statici)
app.use(express.static('public'));

//body parser
app.use(express.json());


// rotte per i post
app.use("/posts", postRouter);



// impostiamo la rotta di home
app.get("/", (req, res) => {
    console.log("hai richiesto la rotta di index");

    res.send('<h1>Ecco la home della API del nostro blog</h1>')
})

//registro il middleware per tutte le rotte 
app.use(notFound)
app.use(errorServer)

// mettiamo in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});