import yaml from 'js-yaml';
import path from 'path';

const getParsed = (data, filename) => {
  const format = path.extname(filename);
  if (format === '.json') {
    return JSON.parse(data);
  }

  return yaml.load(data);
};

export default getParsed;
