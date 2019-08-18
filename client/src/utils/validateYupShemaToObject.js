// Unlike directly using validationSchema, this function takes into account
// order of chained validating functions and use first error from the end
function validateYupShemaToObject(values, yupShema) {
  try {
    yupShema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    return getErrorsFromValidationError(error);
  }
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR]
    };
  }, {});
}

export default validateYupShemaToObject;
