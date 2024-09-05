import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import getParsed from './parsers.js';

const getFileContent = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return readFileSync(fullPath, 'utf-8');
};

const getFileExtension = (fileName) => path.extname(fileName);

const getObjFromFilepath = (filepath) => {
  const fileContents = getFileContent(filepath);
  const fileExtension = getFileExtension(filepath);
  const parsedFile = getParsed(fileContents, fileExtension);
  return parsedFile;
};

const getDifference = (obj1, obj2) => {
  const allKeys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(allKeys).map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'deleted', key, oldValue };
      // return `- ${key}: ${obj1[key]}`;
    }

    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, newValue };
      // return `+ ${key}: ${obj2[key]}`;
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
      // return `  ${key}: ${obj1[key]}`;
    }

    return {
      type: 'changed',
      key,
      oldValue,
      newValue,
    };
    // return `- ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  });

  return sortedKeys;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getObjFromFilepath(filepath1);
  const obj2 = getObjFromFilepath(filepath2);
  return getDifference(obj1, obj2);
};

export default genDiff;
