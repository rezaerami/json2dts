#!/usr/bin/env node
const fs = require('fs');
const convertor = require('../src/convertor');

const [, , ...args] = process.argv;
const filePath = args[0];

const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
console.log(convertor.dtsGenerator(data));