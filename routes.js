const Author = require('./author');

module.exports = function(app) {
    app.get('/authors', function(req, res){
        Author.find({}, function(err, data) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json(data);
            }
        });
    });

    app.post('/authors', function(req, res) {
        var author = new Author({name: req.body.name });
        author.save(function(err, results) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        });
    });

    app.get('/authors/:id', function(req, res){
        Author.findById(req.params.id, function(err, data){
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json(data);
            }
        });
    });

    //ADD QUOTE to this author - votes start at 0
    app.post('/authors/:id/quotes', function(req, res) {
        var quote = {text: req.body.text, votes: 0}
        Author.update({_id: req.params.id}, { $push: { quotes: quote}}, function(err, results) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        });
    });

    app.put('/authors/:id', function(req, res){
        var author = {};
        author.name = req.body.name;
        Author.update({_id: req.params.id}, author, function(err, results) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        });
    });

    app.delete('/authors/:id', function(req, res){
        Author.findByIdAndRemove(req.params.id, function(err, results){
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        });
    });

}
