# node-pgparser

## Parse PostgreSQL statements in Javascript!
`pgparser` is basically just [lib_pgquery](https://github.com/lfittl/libpg_query) ported to Javascript using [Emscripten](http://kripken.github.io/emscripten-site/), with a tiny bit of glue! It is a direct port of PostgreSQL's query parser. The output format is a JSON representation of the [parse tree](https://wiki.postgresql.org/wiki/Query_Parsing).

Note that this is very similar to [pg-query-parser](https://www.npmjs.com/package/pg-query-parser). It has the advantage of being plain JS, so it should run fine in browsers (although it's quite large). The drawback of this package is that I haven't implemented a way to transform the parse tree back into SQL (yet!).

### Usage
Currently, `pgparser` simply parses queries into a parse tree. It returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) when invoked:

```javascript
const pgparser = require('pgparser');

let sql = `
    SELECT
        id,
        first_name
    FROM
        users
`;

pgparser.parse(sql).then((parse_tree) => {
    console.log(parse_tree);
}, (error) => {
    console.warn(`${error.message} near character ${error.cursorpos}`);
});
```
The parse tree for the sample query is below:
```json
[
  {
    "SelectStmt": {
      "targetList": [
        {
          "ResTarget": {
            "val": {
              "ColumnRef": {
                "fields": [
                  {
                    "String": {
                      "str": "id"
                    }
                  }
                ],
                "location": 19
              }
            },
            "location": 19
          }
        },
        {
          "ResTarget": {
            "val": {
              "ColumnRef": {
                "fields": [
                  {
                    "String": {
                      "str": "first_name"
                    }
                  }
                ],
                "location": 31
              }
            },
            "location": 31
          }
        }
      ],
      "fromClause": [
        {
          "RangeVar": {
            "relname": "users",
            "inhOpt": 2,
            "relpersistence": "p",
            "location": 59
          }
        }
      ],
      "op": 0
    }
  }
]
```