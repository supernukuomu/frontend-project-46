import _ from 'lodash';

const getIndentation = (depth, symbol) =>
  symbol ? `${'    '.repeat(depth)}  ${symbol}` : '    '.repeat(depth);

const makeString = (value, level) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const result = Object.entries(currentValue).map(
      ([key, val]) =>
        `${getIndentation(depth + 1, '  ')}${key}: ${iter(val, depth + 1)}`
    );
    return ['{', ...result, `${getIndentation(depth + 1)}}`].join('\n');
  };
  return iter(value, level);
};

const getStylish = (diff) => {
  const iter = (obj, depth) => {
    const result = obj.map((key) => {
      if (key.type === 'deleted') {
        return `${getIndentation(depth, '- ')}${key.key}: ${makeString(
          key.oldValue,
          depth
        )}`;
      }
      if (key.type === 'added') {
        return `${getIndentation(depth, '+ ')}${key.key}: ${makeString(
          key.newValue,
          depth
        )}`;
      }
      if (key.type === 'nested') {
        return `${getIndentation(depth, '  ')}${key.key}: ${iter(
          key.children,
          depth + 1
        )}`;
      }
      if (key.type === 'changed') {
        return [
          `${getIndentation(depth, '- ')}${key.key}: ${makeString(
            key.oldValue,
            depth
          )}\n${getIndentation(depth, '+ ')}${key.key}: ${makeString(
            key.newValue,
            depth
          )}`,
        ];
      }

      return `${getIndentation(depth, '  ')}${key.key}: ${makeString(
        key.oldValue,
        depth
      )}`;
    });

    return ['{', ...result, `${getIndentation(depth)}}`].join('\n');
  };
  return iter(diff, 0);
};

export default getStylish;
