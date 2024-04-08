
const express = require("express");
const bcrypt = require("bcrypt");
const { Student, Teacher } = require("./models/studentschema");
const app = express();
const port = 4000;
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

app.get("/student", (req, res) => {
    res.render("student");
});

app.get("/teacher", (req, res) => {
    res.render("teacher");
});







app.post("/views/index.ejs", async (req, res) => {
    const { role, Email, Password } = req.body;
    if (role === 'student') {
        const student = await Student.findOne({ Email });
        if (!student || student.Password !== Password) {
            return res.status(400).send("Invalid email or password");
        }
        res.redirect("/student");
    } else if (role === 'teacher') {
        const teacher = await Teacher.findOne({ Email });
        if (!teacher || teacher.Password !== Password) {
            return res.status(400).send("Invalid email or password");
        }
        res.redirect("/teacher");
    } else {
        return res.status(400).send("Invalid role");
    }
});



app.post("/views/signup.ejs", (req, res) => {
    console.log(req.body)
    const { role, ...data } = req.body;
    if (role === 'student') {
        Student.create(data)
        .then(() => {
            res.redirect("/")
        })
        .catch((e)=>{
             console.log(e);
         });
    } else if (role === 'teacher') {
        Teacher.create(data)
        .then(() => {
            res.redirect("/")
        })
        .catch((e)=>{
             console.log(e);
         });
    } else {
        res.status(400).send("Invalid role");
    }
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