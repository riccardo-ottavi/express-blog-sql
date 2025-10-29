// importiamo i dati della risorsa
const postsIndex = require('../data/index');

function index(req, res) {
    res.json(postsIndex);
    console.log("ciao ciao")
};


function show(req, res) {
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = postsIndex.find(post => post.id === id);

    // Facciamo il controllo
    if (!post) {

        //Imposto lo status 404
        res.status(404)

        // Restituisco un JSON con le altre informazioni
        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }
    // Restituiamolo sotto forma di JSON   
    res.json(post);
}

function store(req, res) {
    const newId = postsIndex[postsIndex.length - 1].id +1;
    
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    postsIndex.push(newPost)
    console.log(postsIndex)
    res.status(201);
    res.json(newPost)
}

function update(req, res) {
   // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = postsIndex.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }

    // Aggiorniamo il post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.ingredients = req.body.ingredients;
    post.tags = req.body.tags;

    // Controlliamo l'indice
    console.log(postsIndex)

    // Restituiamo il post appena aggiornato
    res.json(post);

}

// MODIFY
function modify(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = postsIndex.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }

    // Aggiorniamo il post
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    // Controlliamo l'indice
    console.log(postsIndex)

    // Restituiamo il post appena aggiornato
    res.json(post);
}


function destroy(req, res) {
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il post tramite id
    const post = postsIndex.find(post => post.id === id);

    // Piccolo controllo
    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // Rimuoviamo il post dal menu
    postsIndex.splice(postsIndex.indexOf(post), 1);

    // aggiungiamo controllo in log
    console.log(postsIndex);

    // Restituiamo lo status corretto
    res.sendStatus(204)
}


// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }