// Importiamo il file di connessione al database
const connection = require('../data/db');
// Index
function index(req, res) {
    // prepariamo la query
    const sql = 'SELECT * FROM posts';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {
    const id = req.params.id
        const sql = `
        SELECT posts.*, tags.*
        FROM posts
        JOIN post_tag ON post_tag.post_id = posts.id
        JOIN tags ON post_tag.tag_id = tags.id
        WHERE posts.id = ?
    `;
    connection.query(sql, [id], (err, results) => {
        if(err) return res.status(500).json({error: 'Database query failed'})
        if(results.length === 0) return res.status(404).json({error: 'Post not found'})
        res.json(results[0]);
    });
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
    // recuperiamo l'id dall' URL 
    const { id } = req.params;
    const sql = 'DELETE FROM posts WHERE id = ?'

    //Eliminiamo il post dal menu                       
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}


// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }