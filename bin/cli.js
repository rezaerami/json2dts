#!/usr/bin/env node
const fs = require('fs');
const convertor = require('../src/convertor');

const [, , ...args] = process.argv;
const srcPath = args[0];
const distPath = args[1];

const data = fs.existsSync(srcPath) ? fs.readFileSync(srcPath, 'utf-8') : '';
const result = convertor.dtsGenerator(data);
console.log(result);
fs.writeFile(distPath, JSON.stringify(result), error => {
    if(error){
        throw new Error("there is an error")
    }
    console.log("successfully write file")
})