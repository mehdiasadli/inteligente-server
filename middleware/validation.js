const { ZodError } = require('zod');

module.exports = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError && error.errors.length > 0) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    return res.status(400).json({ message: 'Validasiya xətası', error });
  }
};
