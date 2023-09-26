const { z } = require('zod');

exports.createFieldSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Field name is required',
    }),
    description: z
      .string({
        invalid_type_error: 'Field desc. must be string',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Field image must be string',
      })
      .optional(),
  }),
});
