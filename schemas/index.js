const { z } = require('zod');
const mongoose = require('mongoose');

exports.idParam = z.object({
  params: z.object({
    id: z
      .string({ required_error: 'ID is required on params' })
      .refine((val) => mongoose.isValidObjectId(val)),
  }),
});
