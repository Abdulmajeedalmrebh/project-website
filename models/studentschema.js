const mongoose=require("mongoose");
const schema =mongoose.Schema;

const StudentSchema=new schema({
    Name:String,
    StudentID:String,
    Email:String,
    Password:String,
})


const TeacherSchema=new schema(
    {
    Name:String,
    TeacherID:String,
    Email:String,
    Password:String,
},
{timestamps:true}
)

const Student = mongoose.model("Student",StudentSchema);
const Teacher = mongoose.model("Teacher",TeacherSchema);


// In your schema file
module.exports = { Student, Teacher };
