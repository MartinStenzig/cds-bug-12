# Problem with CAP Nodejs and SQLite on INSERT.into...from
## Problem description
Based on the model in [model.cds](./db/model.cds) I am trying to perform a simple...
```javascript
const result = await INSERT.into(e2).from(SELECT.columns('ID','description').from(e1))
```
... but then get this error
```shell
SqliteError: no such column: value in:
INSERT INTO ao_test_T_ReportingTypes (ID,description,sourceSystem,createdAt,createdBy,modifiedAt,modifiedBy) SELECT NEW.ID AS ID,NEW.description AS description,(CASE WHEN json_type(value,'$."sourceSystem"') IS NULL THEN 'local' ELSE NULL END) AS sourceSystem,(CASE WHEN json_type(value,'$."createdAt"') IS NULL THEN ISO(session_context('$now')) ELSE ISO(NULL) END) AS createdAt,(CASE WHEN json_type(value,'$."createdBy"') IS NULL THEN session_context('$user.id') ELSE NULL END) AS createdBy,(CASE WHEN json_type(value,'$."modifiedAt"') IS NULL THEN ISO(session_context('$now')) ELSE ISO(NULL) END) AS modifiedAt,(CASE WHEN json_type(value,'$."modifiedBy"') IS NULL THEN session_context('$user.id') ELSE NULL END) AS modifiedBy FROM (SELECT "$S".ID,"$S".description FROM ao_test_S_ReportingTypes as "$S") AS NEW
```

The problem seems to be somewhere in the data model I used in combination with the implementation as if I use a simpler data model like the following...
```cds
namespace ao.test;

entity s_asset {
    key ID          : UUID;
        name        : String(255);
        description : String(255);
}


entity t_asset {
    key ID          : UUID;
        name        : String(255);
        description : String(255);
}
```
...it works. 



## Test
To replicate the problem: 
1. Clone repo
2. Install packages
3. execute `npm run t1`
