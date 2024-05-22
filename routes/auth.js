const express = require('express');
const bcrypt = require('bcrypt');
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const router = express.Router();

router.post("/views/index.ejs", async (req, res) => {
    const { role, Email, Password } = req.body;

    if (role === 'student') {
        const student = await Student.findOne({ Email });
        if (!student) {
            return res.status(400).send("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(Password, student.Password);
        if (!passwordMatch) {
            return res.status(400).send("Invalid email or password");
        }

        req.session.email = Email; // Store the student's email in the session
        req.session.role = 'student'; // Store the role in the session
        res.redirect("/student");
    } else if (role === 'teacher') {
        const teacher = await Teacher.findOne({ Email });
        if (!teacher) {
            return res.status(400).send("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(Password, teacher.Password);
        console.log(`Password match: ${passwordMatch}`); // Debug statement
        if (!passwordMatch) {
            return res.status(400).send("Invalid email or password");
        }

        req.session.email = Email; // Store the teacher's email in the session
        req.session.role = 'teacher'; // Store the role in the session
        
        res.redirect("/teacher");
    } else {
       
        return res.status(400).send("Invalid role");
    }
});


router.post("/views/signup.ejs", async (req, res) => {
    const { role, Password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); // Hash the password
    data.Password = hashedPassword;

    try {
        if (role === 'student') {
            await Student.create(data);
        } else if (role === 'teacher') {
            await Teacher.create(data);
        } else {
            return res.status(400).send("Invalid role");
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error during signup");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error logging out");
        }
        res.redirect("/"); 
    });
});


module.exports = router;
