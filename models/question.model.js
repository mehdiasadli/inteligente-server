const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    type: { type: String, enum: ['OE', 'MC'], default: 'MC' },
    options: [
      {
        title: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
        description: String,
        image: String,
      },
    ],
    answers: [String],
    difficulty: { type: Number, required: true },
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
    subfield: { type: mongoose.Schema.Types.ObjectId, ref: 'Subfield', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
