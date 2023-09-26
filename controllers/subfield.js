const Field = require('../models/field.model');
const Subfield = require('../models/subfield.model');
const Quiz = require('../models/quiz.model');
const Question = require('../models/question.model');

exports.createSubfield = async (req, res) => {
  try {
    const subfield = new Subfield(req.body);
    await subfield.save();

    await Field.findByIdAndUpdate(
      req.body.field,
      { $push: { subfields: subfield._id } },
      { new: true }
    );
    return res.status(201).json(subfield);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.deleteSubfield = async (req, res) => {
  try {
    await Subfield.findByIdAndDelete(req.params.id);

    await Field.findByIdAndUpdate(
      req.body.fieldId,
      { $pull: { subfields: req.params.id } },
      { new: true }
    );
    await Question.deleteMany({ subfield: req.params.id });
    await Quiz.deleteMany({ subfield: req.params.id });

    return res.status(201).json({ message: 'Subfield deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getSubfields = async (req, res) => {
  try {
    const subfields = await Subfield.find({ field: req.params.fieldId });

    return res.status(200).json(subfields);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getSubfield = async (req, res) => {
  try {
    const subfield = await Subfield.findById(req.params.id);
    if (!subfield) return res.status(404).json({ message: 'Subfield not found' });

    return res.status(200).json(subfield);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
