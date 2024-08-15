#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import { readFileSync } from 'node:fs';
import getDifference from '../src/index.js';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, options) => {
    const fullPath1 = path.resolve(process.cwd(), filepath1);
    const fullPath2 = path.resolve(process.cwd(), filepath2);
    const fileContents1 = readFileSync(fullPath1, 'utf-8');
    const fileContents2 = readFileSync(fullPath2, 'utf-8');
    const parsedFile1 = JSON.parse(fileContents1);
    const parsedFile2 = JSON.parse(fileContents2);
    console.log(getDifference(parsedFile1, parsedFile2));
  });

program.parse();
