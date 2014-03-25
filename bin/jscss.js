#!/usr/bin/env node
/*
    Copyright (c) 2013, 2014 Guilherme Vieira (super.driver.512@gmail.com)

    This file is part of JSCSS.

    JSCSS is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    JSCSS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Lesser General Public
    License along with JSCSS. If not, see <http://www.gnu.org/licenses/>.
*/
var util = require('util');
var fs = require('fs');
var peg = require('pegjs');
var codegen = require('../src/code-generator');
var input_file = process.argv[2];
if(!input_file) {
	console.error("Missing input file.");
	console.log("Usage: node jscss.js input-file");
	process.exit(-1);
}
var input_data = fs.readFileSync(input_file, 'utf8');
var grammar_source = fs.readFileSync(__dirname + '/../src/jscss.pegjs', 'utf8');
var jscss;
try {
	jscss = peg.buildParser(grammar_source);
}
catch(err) {
	console.error("Could not build parser:", err.message);
	process.exit(-1);
}
var parse_results;
try {
	parse_results = jscss.parse(input_data);
}
catch(err) {
	if(err.name !== 'SyntaxError') {
		throw err;
	}
	console.error("Line", err.line + ", column", err.column + ":", err.message);
	process.exit(-1);
}
console.log("JSCSS parse tree:");
console.log (
	util.inspect (
		jscss.parse(input_data), {
			depth: null
		}
	)
);
console.log();
var final_code = codegen(parse_results);
console.log("Final JavaScript function body:\n" + final_code);
console.log();
console.log("Final CSS:");
console.log((new Function(final_code))());