export const convertList = (input) => {
  if (typeof input == "string") {
    return [input];
  }

  return input;
};
