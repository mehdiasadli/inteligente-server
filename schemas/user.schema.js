const { z } = require('zod');

exports.updateUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .optional(),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .optional(),
    bio: z
      .string({
        invalid_type_error: 'Bio must be string',
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: 'Bio must be string',
      })
      .optional(),
  }),
});

exports.changeRoleSchema = z.object({
  body: z.object({
    role: z.enum(['Member', 'Moderator', 'Admin'], {
      invalid_type_error: 'Allowed roles are Member, Moderator, and Admin',
    }),
  }),
});
