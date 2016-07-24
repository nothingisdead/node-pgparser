var pg_query = require('./pg_query');

module.exports = {
	parse : function(sql) {
		return new Promise((resolve, reject) => {
			var result = pg_query.parse(sql);

			if(result.parse_tree.length) {
				resolve(result.parse_tree, result);
			}
			else {
				reject(result.error, result);
			}
		});
	}
};
