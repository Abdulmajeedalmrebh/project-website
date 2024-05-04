const mongoose=require("mongoose");
const schema =mongoose.Schema;

const StudentSchema=new schema({
    Name:String,
    StudentID:String,
    Email:String,
    Password:String,
},
{timestamps:true}
)


const TeacherSchema=new schema(
    {
    Name:String,
    TeacherID:String,
    Email:String,
    Password:String,
},
{timestamps:true}
)


const AttendanceSchema=new schema(
    {
    Name:String,
    StudentID:String,
    State:String,
},
{timestamps:true}
)

const Student = mongoose.model("Student",StudentSchema);
const Teacher = mongoose.model("Teacher",TeacherSchema);
const Attendance = mongoose.model("Attendance",AttendanceSchema);

// In your schema file
module.exports = { Student, Teacher,Attendance };
