/**
 * Created by Akshay on 8/5/2017.
 */
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/test");

console.log("connected");

todoSchema = mongoose.Schema({
    title : String,
    age : Object
});

todoModel = mongoose.model('todoModel', todoSchema);


var obj = {title: "cj1qwer", age:{s:18} };

todoModel.create(obj, function (error, doc) {
 //   console.log(error);
  //  console.log("doc is "+doc);
});

todoModel.find()
        .then(function (docs) {
            console.log(docs);
        })