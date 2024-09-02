#!/usr/bin/env node

import { program } from 'commander';
import getDifference from '../src/index.js';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2));
  });

program.parse();
