const { z } = require('zod');

exports.signUpSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z
      .enum(['Member', 'Moderator', 'Admin'], {
        invalid_type_error: 'Allowed roles are Member, Moderator, and Admin',
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

exports.signUpSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z
      .enum(['Member', 'Moderator', 'Admin'], {
        invalid_type_error: 'Allowed roles are Member, Moderator, and Admin',
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

exports.signInSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
