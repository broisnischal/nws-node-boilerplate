/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const placeValue = (template: string, values: any): string => {
  let replacedString = template;
  // eslint-disable-next-line no-unused-vars
  replacedString = replacedString.replace(/\{([^}]+)\}/g, (match, placeholder) => {
    const value = values.shift() || '';
    return value;
  });
  return replacedString;
};

export { placeValue };
