import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(allKeys)
    .map((key) => {
      if (!Object.hasOwn(obj2, key)) {
        return `- ${key}: ${obj1[key]}`;
      }

      if (!Object.hasOwn(obj1, key)) {
        return `+ ${key}: ${obj2[key]}`;
      }

      if (obj1[key] === obj2[key]) {
        return `  ${key}: ${obj1[key]}`;
      }
      return `- ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    })
    .join(`\n  `);

  return `{\n  ${sortedKeys}\n}`;
};

export default getDifference;
