export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const errors = error.errors.map((error) => error.message);
    return res.status(500).json(errors);
  }
};
