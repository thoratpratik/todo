const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT =  process.env.PORT || 4000;
const URL = "mongodb+srv://pratik:Pratik123@todolistcluster.uud5j.mongodb.net/<dbname>?retryWrites=true&w=majority";
const router = express.Router();
const Todo = require('./todo.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || URL, { useNewUrlParser: true ,useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})




router.route('/').get((req,res) =>{
    Todo.find((err,todos) =>{
        if(err)
            console.log(err)
        else
            res.json(todos)
    })
})


router.route('/:id').get( (req,res) =>{
    let id = req.params.id;
    Todo.findById(id, (err,todos)=>{
        if(err)
            console.log(err)
        else
            res.json(todos)
    })
})


router.route('/update/:id').post((req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(!todo)
            res.status(404).send("Data is not found");
        else
        todo.todo_description = req.body.todo_description;
        todo.todo_completed = req.body.todo_completed; 

        todo.save().then( todo =>{
            res.json('TodO Updated')
        })
        .catch(err =>{
            res.status(400).send("update not possible")
        })
    })
})



router.route('/add').post( (req,res) =>{
    let todo = new Todo(req.body);

    todo.save()
     .then( todo =>{
         res.status(200).json("to do added successfully")
     })
     .catch( err => {
         res.status(400).send("adding new todo failed")
     })
    
})

app.use('/', router);

if(process.env.NODE_ENV==="production"){
    app.use(express.static('../../build'))
}

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
