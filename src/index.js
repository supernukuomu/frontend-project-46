import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'node:fs';
import getParsed from './parser.js';

const getDifference = (filepath1, filepath2) => {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);
  const fileContents1 = readFileSync(fullPath1, 'utf-8');
  const fileContents2 = readFileSync(fullPath2, 'utf-8');
  const parsedFile1 = getParsed(fileContents1);
  const parsedFile2 = getParsed(fileContents2);
  const allKeys = Object.keys({ ...parsedFile1, ...parsedFile2 });
  const sortedKeys = _.sortBy(allKeys)
    .map((key) => {
      if (!Object.hasOwn(parsedFile2, key)) {
        return `- ${key}: ${parsedFile1[key]}`;
      }

      if (!Object.hasOwn(parsedFile1, key)) {
        return `+ ${key}: ${parsedFile2[key]}`;
      }

      if (parsedFile1[key] === parsedFile2[key]) {
        return `  ${key}: ${parsedFile1[key]}`;
      }
      return `- ${key}: ${parsedFile1[key]}\n  + ${key}: ${parsedFile2[key]}`;
    })
    .join('\n  ');

  return `{\n  ${sortedKeys}\n}`;
};

export default getDifference;
