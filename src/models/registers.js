const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');
const jwt= require("jsonwebtoken")
const employeeSchema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// middleware
employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
    next();
    // console.log(this.password);

})


employeeSchema.methods.generateAuthToken =async function(){
    try{
        const token= jwt.sign({_id:this._id.toString()},"mynameisswikkicodes");
        console.log(token)
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token
    }
    catch(e){
        res.send("the error part "+ e);
        console.log("the error part "+ e);

    }
}




const Register= new mongoose.model("register",employeeSchema);

module.exports=Register;