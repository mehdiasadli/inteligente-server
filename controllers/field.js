const Field = require('../models/field.model');
const Subfield = require('../models/subfield.model');
const Question = require('../models/question.model');
const Quiz = require('../models/quiz.model');

exports.createField = async (req, res) => {
  try {
    const field = new Field(req.body);
    await field.save();

    return res.status(201).json(field);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.deleteField = async (req, res) => {
  try {
    await Field.findByIdAndDelete(req.params.id);
    await Subfield.deleteMany({ field: req.params.id });
    await Question.deleteMany({ field: req.params.id });
    await Quiz.deleteMany({ field: req.params.id });

    return res.status(200).json({ message: 'Kateqoriya silindi' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id).populate('subfields');

    return res.status(200).json(field);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getFields = async (_, res) => {
  try {
    const fields = await Field.find().populate('subfields');

    return res.status(200).json(fields);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
