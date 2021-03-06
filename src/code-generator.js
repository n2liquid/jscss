module.exports = function(style_name, ast, deinterpolate) {
	var code = 'function() {'
			+ '\nvar jscss$css = "";';
	ast.forEach (
		function(element) {
			switch(element.type) {
				case 'javascript':
					new Function(element.code);
					code += '\n' + element.code + ';'
					break;
				case 'css':
					var compute_locals = 'var locals = [];';
					var next_local_id = 0;
					var rule_body_parts = [];
					var rule_body;
					element.properties.forEach (
						function(property) {
							value = deinterpolate(property.value).map (
								function(part) {
									if(typeof(part) === 'string') {
										return JSON.stringify(part);
									}
									else {
										var compute_local_fn = new Function (
											'return ' + part.code + ';'
										);
										compute_locals +=
												'\nlocals.push ('
												+ '\n(' + compute_local_fn + '\n)()'
												+ '\n);';
										return 'locals[' + (next_local_id++) + ']';
									}
								}
							);
							rule_body_parts = rule_body_parts.concat (
								JSON.stringify('\n\t' + property.name + ': ')
								, value
								, '";"'
							);
						}
					);
					if(rule_body_parts.length !== 0) {
						rule_body = rule_body_parts.join('\n+ ');
					}
					else {
						rule_body = '""';
					}
					code +=
							'\n(function() {'
							+ '\n' + compute_locals
							+ '\njscss$css += '
							+ JSON.stringify(element.selector)
							+ '\n+ ' + JSON.stringify('\n{')
							+ '\n+ ' + rule_body
							+ '\n+ ' + JSON.stringify('\n}')
							+ '\n+ ' + JSON.stringify('\n')
							+ '\n})();';
					break;
				default:
					throw new Error("Unknown element type: '" + element.type + "'.");
			}
		}
	);
	code += '\nreturn jscss$css;'
			+ '\n}';
	if(style_name) {
		code = 'window.jscss = window.jscss || {};'
				+ '\nwindow.jscss[' + JSON.stringify(style_name) + '] ='
				+ '\n' + code + ';'
	}
	return code;
}
