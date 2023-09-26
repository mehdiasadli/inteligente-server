const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
    subfield: { type: mongoose.Schema.Types.ObjectId, ref: 'Subfield', required: true },
    mode: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        answer: String,
        isCorrect: Boolean,
        point: Number,
        time: Number,
      },
    ],
    points: { type: Number, default: 0 },
    finished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
