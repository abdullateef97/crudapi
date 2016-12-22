/**
 * Created by root on 12/18/16.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookschema = new schema({
    title : {
        type: String,
        required : true,
        unique : true
    },
    keyword : Array,
    published : Boolean,
    date_published :{
        type : Date,
        default : Date.now()
    },
    details : {
            ISN_number : Number,
        rank: Number
    },
    author : String

});

module.exports = mongoose.model('Book',bookschema);