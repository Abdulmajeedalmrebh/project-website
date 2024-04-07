/*const mongoose=require("mongoose")
const app = require('./app.js'); 


mongoose.connect('mongodb+srv://gintaku07:o44kv0e1Awst9GBg@wristband.yxyzveb.mongodb.net/?retryWrites=true&w=majority&appName=Wristband')
.then(()=>{
    app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

})
.catch((e)=>{
    console.log(e);
})



 /*try {
        
        //find user
        const findStudent= Student.find((data) => email == data.email)
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
    }*/


     /*try {
        
        //find user
        const findStudent= Student.find((data) => email == data.email)
        if (findStudent) {
            res.status(400).send("wrong email or password");
        }
        //hash password
        const passwordMatch=  await bcrypt.comper(password,findStudent.password);
        if(passwordMatch) {
            {Name,Email,Password,ConfirmPassword}create(req.body)
            res.status(200).send("login sucssasfuly");
            Student.create(req.body)
      } else {
        res.status(400).send("wrong email or password");
    }
        
    } catch (err){
        res.status(500).send(err)
    }*/

    
/*
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/

/*


//find user
const findStudent = await Student.findOne({ email: req.body.email });
//check if user exists
if (findStudent) {
    res.status(400).send("user already exists");
}
//hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
//create user
const newStudent = new Student({
    email: req.body.email,
    password: <PASSWORD>
});

//save user
newStudent.save();
*/