const { z } = require('zod');
const mongoose = require('mongoose');

exports.createQuestionSchema = z.object({
  body: z
    .object({
      title: z.string({
        required_error: 'Question title is required',
      }),
      description: z
        .string({
          invalid_type_error: 'Question description must be a string',
        })
        .optional(),
      image: z
        .string({
          invalid_type_error: 'Question image must be a string',
        })
        .optional(),
      type: z.enum(['OE', 'MC'], {
        required_error: 'Question type is required',
        invalid_type_error: 'Allowed question types are OE (Open-ended) and MC (Multi choice)',
      }),
      options: z
        .array(
          z.object({
            title: z.string({
              required_error: 'Option title is required',
            }),
            description: z
              .string({
                invalid_type_error: 'Option description must be a string',
              })
              .optional(),
            image: z
              .string({
                invalid_type_error: 'Option image must be a string',
              })
              .optional(),
            isCorrect: z.boolean().optional(),
          })
        )
        .optional(),
      answers: z
        .array(
          z.string({
            invalid_type_error: 'Answer must be a string',
          })
        )
        .optional(),
      difficulty: z.number({
        required_error: 'Difficulty is required',
        invalid_type_error: 'Difficulty must be a number, between 1 and 10',
      }),
      field: z
        .string({ required_error: 'Field ID is required' })
        .refine((val) => mongoose.isValidObjectId(val)),
      subfield: z
        .string({ required_error: 'Field ID is required' })
        .refine((val) => mongoose.isValidObjectId(val)),
    })
    .refine(
      (val) =>
        (val?.options?.length && !val?.answers?.length) ||
        (!val?.options?.length && val?.answers?.length),
      {
        message: 'At least one of the fields (options or answers) is required',
      }
    ),
});

exports.addBulkSchema = z.object({
  body: z.object({
    questions: z.array(
      z
        .object({
          title: z.string({
            required_error: 'Question title is required',
          }),
          description: z
            .string({
              invalid_type_error: 'Question description must be a string',
            })
            .optional(),
          image: z
            .string({
              invalid_type_error: 'Question image must be a string',
            })
            .optional(),
          type: z.enum(['OE', 'MC'], {
            required_error: 'Question type is required',
            invalid_type_error: 'Allowed question types are OE (Open-ended) and MC (Multi choice)',
          }),
          options: z
            .array(
              z.object({
                title: z.string({
                  required_error: 'Option title is required',
                }),
                description: z
                  .string({
                    invalid_type_error: 'Option description must be a string',
                  })
                  .optional(),
                image: z
                  .string({
                    invalid_type_error: 'Option image must be a string',
                  })
                  .optional(),
                isCorrect: z.boolean().optional(),
              })
            )
            .optional(),
          answers: z
            .array(
              z.string({
                invalid_type_error: 'Answer must be a string',
              })
            )
            .optional(),
          difficulty: z.number({
            required_error: 'Difficulty is required',
            invalid_type_error: 'Difficulty must be a number, between 1 and 10',
          }),
        })
        .refine(
          (val) =>
            (val?.options?.length && !val?.answers?.length) ||
            (!val?.options?.length && val?.answers?.length),
          {
            message: 'At least one of the fields (options or answers) is required',
          }
        )
    ),
    field: z
      .string({ required_error: 'Field ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
    subfield: z
      .string({ required_error: 'Field ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
  }),
});

exports.updateQuestionSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Question title is required',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Question description must be a string',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Question image must be a string',
      })
      .optional(),
    difficulty: z
      .number({
        invalid_type_error: 'Difficulty must be a number, between 1 and 10',
      })
      .optional(),
  }),
});

exports.getQuestionsSchema = z.object({
  query: z.object({
    field: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val))
      .optional(),
    subfield: z
      .string()
      .refine((val) => mongoose.isValidObjectId(val))
      .optional(),
  }),
});
