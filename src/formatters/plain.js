import _ from 'lodash';

const makeString = (currentValue) => {
  if (!_.isObject(currentValue)) {
    return `'${currentValue}'`;
  }
  return '[complex value]';
};

const getPlain = (diff) => {
  const iter = (obj, path) => {
    const result = obj
      .map((key) => {
        const completedKey = `${path}${key.key}`;
        if (key.type === 'deleted') {
          return `Property '${completedKey}' ${'was removed'}`;
        }
        if (key.type === 'added') {
          return `Property '${completedKey}' ${'was added with value:'} ${makeString(
            key.newValue,
          )}`;
        }
        if (key.type === 'changed') {
          return `Property '${completedKey}' ${'was updated. From'} ${makeString(
            key.oldValue,
          )} to ${makeString(key.newValue)}`;
        }
        if (key.type === 'nested') {
          return iter(key.children, `${completedKey}.`);
        }
        return null;
      })
      .filter((str) => str != null)
      .join('\n');
    return result;
  };
  return iter(diff, '');
};

export default getPlain;
