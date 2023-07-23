const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user:{
    type:String, 
    reqiured:true,
  }

});

const qsSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  question: {
    type: String,
  },
  answers: [answerSchema], // Array of answers
});

const Question = mongoose.model("question", qsSchema);

module.exports = Question;
