
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;
//const db = require("./db")
const mongoose=require("mongoose")
app.set('view engine', 'ejs');
app.get("/",(req, res) => {
    res.render("index");
});
app.use(express.static('css-file'));
app.use(express.static('js-file'));
app.use(express.static('img'));

mongoose.connect('mongodb+srv://gintaku07:o44kv0e1Awst9GBg@wristband.yxyzveb.mongodb.net/?retryWrites=true&w=majority&appName=Wristband')
.then(()=>{
    app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

})
.catch((e)=>{
    console.log(e);
})

/*const connectLivereload = require('connect-livereload');
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
         liveReloadServer.refresh("index");
    }, 100);
});*/






const student = [];
const teacher = [];

app.use(express.json());


/*

app.post("/sgnin", async(req, res) => {
    try {
        const {email, password} = req.body
        //find user
        const findStudent= student.find((data) => email == data.email)
        if (!findStudent) {
            res.status(400).send("wrong email or password");
        }
        //compare hashed password
        const passwordMatch=  await bcrypt.compare(password, findStudent.password);
        if(passwordMatch) {
            res.status(200).send("login successful");
        } else {
            res.status(400).send("wrong email or password");
        }
        
    } catch (err){
        res.status(500).send(err)
    }
});


app.post("/sgnin", async(req, res) => {
    try {
        const {email, password} = req.body
        //find user
        const findStudent= student.find((data) => email == data.email)
        if (!findStudent) {
            res.status(400).send("wrong email or password");
        }
        //hash password
        const passwordMatch=  await bcrypt.comper(password,findStudent.password);
        if(passwordMatch) {
            res.status(200).send("login sucssasfuly");
      } else {
        res.status(400).send("wrong email or password");
    }
        
    } catch (err){
        res.status(500).send(err)
    }

});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/