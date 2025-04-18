export const notReachable = (value: never): never => {
  throw new Error(`This code should not be reached. Value: ${value}`);
};
