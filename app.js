
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const port = 5500;
const db = require("./db")


const student = [];
const teacher = [];

app.use(express.json());

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
});