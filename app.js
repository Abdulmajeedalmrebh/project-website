
const express = require("express");
const bcrypt = require("bcrypt");
const { Student, Teacher } = require("./models/studentschema");
const app = express();
const port = 5000;
//const db = require("./db")
const mongoose=require("mongoose")

app.set('view engine', 'ejs');
app.use(express.static('css-file'));
app.use(express.static('js-file'));
app.use(express.static('img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 





app.get("/",(req, res) => {
    res.render("index");
});

app.get('/signup.ejs', (req, res) => {
    res.render('signup')
})
app.get("/index.ejs",(req, res) => {
    res.render("index");
});

app.get("/student.ejs",(req, res) => {
    res.render("student");
});

app.get("/teacher.ejs",(req, res) => {
    res.render("teacher");
});






app.post("/views/index.ejs", async (req, res) => {
    const { Email, Password } = req.body;
    const student = await Student.findOne({ Email });
    if (!student) {
        return res.status(400).send("Invalid email or password");
    }
    // Add password comparison logic here if passwords are hashed
    if (student.Password !== Password) {
        return res.status(400).send("Invalid email or password");
    }
    res.redirect("/");
});

app.post("/views/index.ejs", async (req, res) => {
    const { Email, Password } = req.body;
    const teacher = await Teacher.findOne({ Email });
    if (!teacher) {
        return res.status(400).send("Invalid email or password");
    }
    // Add password comparison logic here if passwords are hashed
    if (teacher.Password !== Password) {
        return res.status(400).send("Invalid email or password");
    }
    res.redirect("/");
});



app.post("/views/signup.ejs", (req, res) => {
    console.log(req.body)
    Student.create(req.body)
    .then(() => {
        res.redirect("/")
    })
    .catch((e)=>{
         console.log(e);
     });
});

app.post("/views/signup.ejs", (req, res) => {
    console.log(req.body)
    Teacher.create(req.body)
    .then(() => {
        res.redirect("/")
    })
    .catch((e)=>{
         console.log(e);
     });
});



mongoose.connect('mongodb+srv://gintaku07:o44kv0e1Awst9GBg@wristband.yxyzveb.mongodb.net/?retryWrites=true&w=majority&appName=Wristband')
.then(()=>{
    app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

})
.catch((e)=>{
    console.log(e);
})