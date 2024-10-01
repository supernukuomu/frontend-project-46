import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import getParsed from './parsers.js';
import selectFormatting from './formatters/index.js';

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
  return _.sortBy(allKeys).map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    /* eslint no-nested-ternary: 0 */

    return Object.hasOwn(obj2, key)
      ? Object.hasOwn(obj1, key)
        ? _.isObject(oldValue) && _.isObject(newValue)
          ? { type: 'nested', key, children: getDifference(oldValue, newValue) }
          : oldValue === newValue
            ? { type: 'unchanged', key, oldValue }
            : {
              type: 'changed',
              key,
              oldValue,
              newValue,
            }
        : { type: 'added', key, newValue }
      : { type: 'deleted', key, oldValue };
  });
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getObjFromFilepath(filepath1);
  const obj2 = getObjFromFilepath(filepath2);
  return selectFormatting(getDifference(obj1, obj2), format);
};

export default genDiff;
