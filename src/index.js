import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import getParsed from './parsers.js';

const getFileContent = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return readFileSync(fullPath, 'utf-8');
};

const getFileExtension = (fileName) => path.extname(fileName);

const getDifference = (filepath1, filepath2, format = 'stylish') => {
  const fileContents1 = getFileContent(filepath1);
  const fileContents2 = getFileContent(filepath2);
  const fileExtension1 = getFileExtension(filepath1);
  const fileExtension2 = getFileExtension(filepath2);
  const parsedFile1 = getParsed(fileContents1, fileExtension1);
  const parsedFile2 = getParsed(fileContents2, fileExtension2);
  const allKeys = Object.keys({ ...parsedFile1, ...parsedFile2 });
  const sortedKeys = _.sortBy(allKeys).map((key) => {
    const oldValue = parsedFile1[key];
    const newValue = parsedFile2[key];
    if (!Object.hasOwn(parsedFile2, key)) {
      return { type: 'deleted', key, oldValue };
      // return `- ${key}: ${parsedFile1[key]}`;
    }

    if (!Object.hasOwn(parsedFile1, key)) {
      return { type: 'added', key, newValue };
      // return `+ ${key}: ${parsedFile2[key]}`;
    }

    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        type: 'nested',
        key,
        children: getDifference(oldValue, newValue),
      };
    }

    if (oldValue === newValue) {
      return { type: 'unchanged', key, oldValue };
      // return `  ${key}: ${parsedFile1[key]}`;
    }
    return { type: 'changed', key, oldValue, newValue };
    // return `- ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}`;
  });

  return sortedKeys;
};

export default getDifference;
