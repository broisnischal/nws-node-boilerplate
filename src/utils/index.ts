/* eslint-disable arrow-body-style */
import slugify from 'slugify';

interface Identifiable {
  _id: string;
}

const Utils = {
  slugIt: (val: string): string => {
    return slugify(val, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      locale: 'vi',
      trim: true,
    });
  },
  arraysAreEqual: <T extends Identifiable>(arr1: T[], arr2: T[]): boolean => {
    // eslint-disable-next-line no-underscore-dangle
    return arr2.every((value, index) => value._id.toString() === arr1[index]._id.toString());
  },
  capatilizeFirstLetter: (str: string): string => str.charAt(0).toUpperCase() + str.slice(1),
};

export default Utils;
