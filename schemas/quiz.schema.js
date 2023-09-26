const { z } = require('zod');
const mongoose = require('mongoose');

exports.startQuizSchema = z.object({
  body: z.object({
    user: z
      .string({ required_error: 'User ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
    field: z
      .string({ required_error: 'Field ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
    subfield: z
      .string({ required_error: 'Subfield ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
    mode: z.enum(['Easy', 'Medium', 'Hard'], {
      required_error: 'Quiz mode is required',
      invalid_type_error: 'Allowed quiz modes are Easy, Medium, and Hard',
    }),
  }),
});

exports.endQuizSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        question: z
          .string({ required_error: 'Question ID on answer is required' })
          .refine((val) => mongoose.isValidObjectId(val)),
        answer: z.string({ required_error: "User's answer is required" }),
        isCorrect: z.boolean({
          required_error: 'IsCorrect is required',
          invalid_type_error: 'IsCorrect must be boolean (either true or false)',
        }),
        point: z.number({
          required_error: 'Question point is required',
          invalid_type_error: 'Question point must be number',
        }),
        time: z.number({
          required_error: 'Question time is required',
          invalid_type_error: 'Question time must be number',
        }),
      })
    ),
    points: z.number({
      required_error: 'Quiz points is required',
      invalid_type_error: 'Quiz points must be number',
    }),
  }),
});

exports.getQuizesSchema = z.object({
  query: z.object({
    user: z
      .string({ invalid_type_error: 'User ID must be string' })
      .refine((val) => mongoose.isValidObjectId(val))
      .optional(),
    field: z
      .string({ invalid_type_error: 'Field ID must be string' })
      .refine((val) => mongoose.isValidObjectId(val))
      .optional(),
    subfield: z
      .string({ invalid_type_error: 'Subfield ID must be string' })
      .refine((val) => mongoose.isValidObjectId(val))
      .optional(),
  }),
});

exports.getBoardSchema = z.object({
  query: z.object({
    field: z
      .string({ invalid_type_error: 'Field ID must be string' })
      .refine((val) => mongoose.isValidObjectId(val)),
    subfield: z
      .string({ invalid_type_error: 'Subfield ID must be string' })
      .optional(),
  }),
});
