const pgparser = require('./index');

let sql = `
	SELECT
		id,
		first_name
	FROM
		users
`;

let correct = '[{"SelectStmt":{"targetList":[{"ResTarget":{"val":{"ColumnRef":{"fields":[{"String":{"str":"id"}}],"location":11}},"location":11}},{"ResTarget":{"val":{"ColumnRef":{"fields":[{"String":{"str":"first_name"}}],"location":17}},"location":17}}],"fromClause":[{"RangeVar":{"relname":"users","inhOpt":2,"relpersistence":"p","location":36}}],"op":0}}]';

pgparser(sql).then((tree) => {
	if(JSON.stringify(tree) !== correct) {
		console.error("pgparse test failed!");
		process.exit(1);
	}
	else {
		console.log("pgparse test passed");
	}
}, (e) => {
	console.error("pgparse test failed!");
	process.exit(1);
});
