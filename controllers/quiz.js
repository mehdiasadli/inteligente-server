const Question = require('../models/question.model');
const Quiz = require('../models/quiz.model');
const Subfield = require('../models/subfield.model');

const randomIndex = require('../utils/randomIndex');

const QUESTION_COUNT_PER_DIFF = 5;

exports.startQuiz = async (req, res) => {
  const { field, subfield, mode } = req.body;

  try {
    const sub = await Subfield.findById(subfield);

    const diffs = mode === 'Hard' ? [7, 8, 9, 10] : mode === 'Easy' ? [1, 2, 3, 4] : [4, 5, 6, 7];
    const allQuestions = await Question.find({ field, subfield });
    let questions = [];

    diffs.forEach((diff) => {
      const diffed = allQuestions.filter((q) => q.difficulty === diff);

      if (diffed.length <= QUESTION_COUNT_PER_DIFF) {
        questions.push(...diffed.map((d) => d._id));
      } else {
        const indexes = randomIndex(diffed.length, QUESTION_COUNT_PER_DIFF);
        indexes.forEach((index) => {
          questions.push(diffed[index]._id);
        });
      }
    });
    const quiz = new Quiz({ ...req.body, questions });
    await quiz.save();

    return res
      .status(201)
      .json(await Quiz.findById(quiz._id).populate('questions field subfield user'));
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.endQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { ...req.body, finished: true },
      { new: true }
    );

    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Oyun silindi' });
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions field subfield user');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
exports.getQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find()
      .populate('questions field subfield user')
      .sort({ createdAt: -1 });

    return res.status(200).json(quizes);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getBoard = async (req, res) => {
  const { field, subfield } = req.query;

  try {
    const quizes = !subfield
      ? await Quiz.find({ finished: true, field })
          .populate('questions field subfield user')
          .sort({ points: -1 })
      : await Quiz.find({ finished: true, field, subfield })
          .populate('questions field subfield user')
          .sort({ points: -1 });

    return res.status(200).json(quizes);
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};

exports.getAverage = async (_, res) => {
  try {
    const quizes = await Quiz.find({ finished: true }).populate('user');
    const data = quizes.map((q) => ({ username: q.user.username, points: q.points }));
    const group = data.reduce((acc, i) => {
      const { username, points } = i;
      if (!acc[username]) {
        acc[username] = [];
      }

      acc[username].push(points);
      return acc;
    }, {});

    return res.status(200).json(
      Object.entries(group)
        .map(([username, points]) => ({
          username,
          average: points.reduce((a, c) => a + c, 0) / points.length,
          total: points.length,
        }))
        .sort((a, b) => b.average - a.average)
    );
  } catch (error) {
    return res.status(500).json({ message: 'Server xətası', error });
  }
};
