const path=require("path");
const express= require("express");
const hbs= require("hbs");
const app = express();
const port= process.env.PORT || 3000;
const bcrypt=require('bcryptjs');
const Register= require("./models/registers");
const Question = require("./models/question");
require("./db/conn")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const session = require('express-session');
// console.log(path.join(__dirname,"../public"));
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));


const template_path=path.join("templates/views")
const partials_path=path.join("templates/partials")
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


const secretKey= require("./sessions");
app.use(session({
    secret:secretKey, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
  }));

app.get("/",(req,res)=>{
    res.redirect("index");
    // res.send("hello from the swikkicodes");
})
app.get("/index",async(req,res)=>{
    try{
        const questions= await Question.find({});
        res.status(201).render("index",{questions});
    }catch(e){
         console.log(e);
    }
})
app.get("/register",(req,res)=>{
    res.render("register");
    // res.send("hello from the swikkicodes");
})
app.post('/register',async(req,res)=>{
    try{
       const password= req.body.password;
       const cpassword= req.body.cpassword;
    //    const hashedpass=await bcrypt.hash(password,10);
    //    const hashedcpass=await bcrypt.hash(cpassword,10);
        if(password===cpassword){
            // res.send(req.body.firstname);
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                age:req.body.age,
                phone:req.body.phone,
                password:password,
                cpassword:cpassword,
                // password:  hashedpass,
                // cpassword: hashedcpass,
            })
            const token= await registerEmployee.generateAuthToken();
            const registered= await registerEmployee.save();
            req.session.user = registered;
            res.status(201).redirect("dashboard");
        }else{
            // alert("password are not matching");
            res.send("<script>alert('Passwords do not match'); window.location.href='/register';</script>");
        }
    }catch(e){
        res.status(400).send("data not filled");
    }
})

app.get("/login",(req,res)=>{
    res.render("login");
    // res.send("hello from the swikkicodes");
})

app.post('/login',async(req,res)=>{
    try{
        const email= req.body.email;
        const password= req.body.password;
        const userData= await Register.findOne({email:email})
        const passwordMatch= await bcrypt.compare(password,userData.password)
        if(passwordMatch){
            req.session.user = userData;
            res.redirect("/dashboard");
        }
        else{
            res.send("<script>alert('invalid login details'); window.location.href='/login';</script>");
        }

    }catch(e){
        res.send("<script>alert('User is not registered'); window.location.href='/login';</script>");
    }
})
app.get("/dashboard", async (req,res)=>{
    // console.log(req.session.user);
    if (req.session.user) {
        try {
            const userName=req.session.user.firstname;
            const questions = await Question.find({});
            res.status(201).render('dashboard', { questions, userName});
        } catch (e) {
          console.log(e);
          res.status(500).render('error', { error: 'Internal server error' });
        }
      } else {
        // If the user is not authenticated, redirect them to the login page (or any other appropriate action)
        res.redirect('/login'); // Change '/login' to the appropriate login route
      }

})
app.get("/question",async (req,res)=>
{
    if (req.session.user) {
        try {
            const userName=req.session.user.firstname;
            res.status(201).render("question",{userName});;
        } catch (e) {
          console.log(e);
          res.status(500).render('error', { error: 'Internal server error' });
        }
      } else {
        // If the user is not authenticated, redirect them to the login page (or any other appropriate action)
        res.redirect('/login'); // Change '/login' to the appropriate login route
      }
})

app.post("/addquestion",async (req,res)=>{
    try{
        const userEmail=req.session.user.email
        const Qn =new Question({
            email: userEmail,
            question: req.body.question,
        })
        const qnStored= await Qn.save();
        console.log(Qn);
        res.redirect("/dashboard");
    }catch(e){
        console.error(e); // Log the error to the console
        res.status(400).send("data failed to save");
    }
})


app.post("/answer", async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    // Validate if the provided questionId is a valid ObjectId
    if (!ObjectId.isValid(questionId)) {
      return res.status(400).send("Invalid question ID");
    }

    // Find the question in the database by its ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).send("Question not found");
    }

    // Add the answer to the question's collection
    question.answers.push({ text: answer, user:req.session.user.firstname});
    await question.save();

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout",async (req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.log('Error destroying session:', err);
        } else {
          res.redirect('/login'); 
        }
})
});

app.listen(port,()=>{
    console.log(`server started at port no. ${port}`)
})
