import getStylish from './stylish.js';
import getPlain from './plain.js';

const selectFormatting = (diff, format = 'stylish') => {
  if (format === 'plain') {
    return getPlain(diff);
  }
  if (format === 'json') {
    return JSON.stringify(diff);
  }
  return getStylish(diff);
};

export default selectFormatting;
