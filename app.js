/**
 * Created by root on 12/18/16.
 */
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs')
    var ws = fs.createWriteStream('bookola.txt');

var app = express();
var Book = require('./book_schema')
var db = 'mongodb://localhost/crudapi';
mongoose.connect(db);
//for post 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended : true
}))
//get all books
app.get('/books',function (req,res) {
    console.log("getting books");
    Book.find({})
        .exec(function (err,books) {
            if(err){
                res.send("error")
            }
            else{
                res.json(books).pipe(ws)
            }
        })
})
//get only one book
app.get('/books/:id',function (req,res) {
    console.log('getting book with cat ', req.params.cat);
    Book.findOne({
        _id:req.params.id
    })
        .exec(function (err,book) {
            if(err){
                res.send("error occured")
            }
            else
                res.json(book)
        })

});
//post book
app.post('/boooks',function(req,res){
    var newbook = new Book();
    newbook.title = req.body.title
    newbook.author = req.body.author;


    newbook.save(function(err,book){

        if(err){
            console.log(err.log);
            res.send("error occured")
        }
        else {

            console.log(book.title + "succesfully saved")
        }
      //  book.write(ws)
    })
    // var booktitle = newbook.title
    // booktitle.pipe(ws)

})

//update title
app.put('/book/:id',function(req,res){
    Book.findOneAndUpdate({
            _id : req.params.id
        },{$set :
            {title : req.body.title}},
        {upsert : true},
        function(err,newBook){
            if(err){
                console.log (err.log)
            }
            else
                console.log('title was updated to ' + newBook.title)
            res.status(204)
        }

    )
})

//delte book
app.delete('/delbook/:title',function(req,res){
    Book.find({title : req.params.title.replace(/\-/g, " ")}).remove(function (err,bookk) {
        if(err){
            throw err;
        }
        else
            console.log("deleted");
            res.status(204)

    })
    // var db = req.db;
    // var collection = db.get('book')
    // /*Book*/ db.collection.findOneAndDelete({
    //     title : req.params.id
    // }),
    //     function(err,book){
    //         if(err){
    //             console.log(err.log)
    //         }
    //         else
    //             console.log('succesfully deleted')
    //         res.status(204);
    //     }

})

app.listen(8080,function (req,res) {
    console.log('listening')
   // res.end('listening')
})