const Question = require('../models/question.model');

exports.createQuestion = async (req, res) => {
  const { title } = req.body;

  try {
    const isExists = await Question.findOne({ title });
    if (isExists) return res.status(400).json({ message: 'Sual mətni artıq mövcuddur' });

    const question = new Question(req.body);

    await question.save();
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.addBulk = async (req, res) => {
  const { questions, field, subfield } = req.body;

  try {
    const data = questions.map((q) => ({ ...q, field, subfield }));
    await Question.insertMany(data);

    return res.status(201).json({ message: 'Questions created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('field subfield');

    return res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Sual silindi' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getQuestions = async (req, res) => {
  const { field, subfield } = req.query;

  try {
    return res.status(200).json(
      await Question.find({ field, subfield }).populate({
        path: 'subfield',
        select: 'name',
        populate: {
          path: 'field',
          model: 'Field',
          select: 'name',
        },
      })
    );
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getQuestionCount = async (_, res) => {
  try {
    return res.status(200).json({ count: await Question.countDocuments() });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
