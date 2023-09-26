const { z } = require('zod');
const mongoose = require('mongoose');

exports.createSubfieldSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Subfield name is required',
    }),
    description: z
      .string({
        invalid_type_error: 'Subfield desc. must be string',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Subfield image must be string',
      })
      .optional(),
    field: z
      .string({ required_error: 'Field ID is required' })
      .refine((val) => mongoose.isValidObjectId(val)),
  }),
});

exports.getSubfieldsSchema = z.object({
  params: z.object({
    fieldId: z
      .string({ required_error: 'Field ID is required on params' })
      .refine((val) => mongoose.isValidObjectId(val)),
  }),
});
