// eslint-disable-next-line import/prefer-default-export
export const extractErrorMessage = (error) => {
  // TODO: Write code to extract error message and replace placeholder in string
  if (error.message) {
    return error.message;
  }

  return JSON.stringify(error);
};


export function isNumber(n) {
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}
