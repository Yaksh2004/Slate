export const validate = schema => (req, res, next) => {
  try {
    const parsedData = schema.parse(req.body);
    req.body = parsedData;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.errors[0].message,
    });
  }
};
