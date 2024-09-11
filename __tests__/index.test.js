/* eslint implicit-arrow-linebreak: 0 */
/* eslint comma-dangle: 0 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) =>
  resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'stylish', readFile('expectedDiffStylish.txt')],
  ['yml', 'stylish', readFile('expectedDiffStylish.txt')],
  ['json', 'plain', readFile('expectedDiffPlain.txt')],
  ['yml', 'plain', readFile('expectedDiffPlain.txt')],
  ['json', 'json', readFile('expectedDiffJson.txt')],
  ['yml', 'json', readFile('expectedDiffJson.txt')],
])('all test gendiff', (extension, format, expected) => {
  expect(
    getDifference(
      getFixturePath(`file3.${extension}`),
      getFixturePath(`file4.${extension}`),
      format
    )
  ).toEqual(expected);
});
