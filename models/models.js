const mongoose = require('mongoose');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDb!');
})
mongoose.connect(process.env.MONGODB_URI);



const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  password: {
    type: String,
    required: true
  },
  classes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Class'
    }
  ]
})

const lectureSchema = mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true
  },
  slideId: String,
  reactions: {
    type: Array
  },
  currentSlide: Number,
  slideBySlide:[{
    messages: Array,
    reactions: Object
  }],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  },
  active: Boolean
})

lectureSchema.methods.getMessages = async function() {
  var self = this;
  var messages = await messageModel.find({ 'lecture': self._id });
  return messages;
}

lectureSchema.methods.getQuestions = async function() {
  var self = this;
  var questions = await questionModel.find({ 'lectureId': self._id });
  return questions;
}
// lectureSchema.methods.getSlideBySlide = async function() {
//   var self = this;
//   var slideBySlide = await messageModel.find({ 'lecture': self._id });
//   return slideBySlide;
// }


// const slideBySlideSchema = mongoose.Schema({
//   lecture: String,
//   slideBySlide:[{
//     id: String,
//     Reaction: Number
//   }]
// })

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likes: Array,
  replies: Array,
  lecture: String,
  userId: String
})

const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  },
  lectures: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lecture'
    }
  ]
})

const slideSchema = mongoose.Schema({
  pdf:{
    name: String,
    data: Buffer
  },
  // slideNumber:{
  //   type: Number
  // },
  // totalSlides:{
  //   type: Number
  // },
  lectureId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Lecture'
  }
})

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: Array,
  answers: Object,
  lectureId: String
})



const studentModel = mongoose.model('Student', studentSchema);
const lectureModel = mongoose.model('Lecture', lectureSchema);
const messageModel = mongoose.model('Message', messageSchema);
const classModel = mongoose.model('Class', classSchema);
const slideModel = mongoose.model('Slide', slideSchema);
const questionModel = mongoose.model('Question', questionSchema);
// const slideBySlideModel = mongoose.model('SlideBySlide', slideBySlideSchema);

module.exports = {
  Student: studentModel,
  Lecture: lectureModel,
  Message: messageModel,
  Class: classModel,
  Slide: slideModel,
  Question: questionModel
  // SlideBySlide: slideBySlideModel
}
