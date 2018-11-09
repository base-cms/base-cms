# BaseCMS DB

```js
const Base = require('@base-cms/db');

// Create the instance.
const base = new Base({
  url:  'mongodb://localhost:4111',
  tenant: 'cygnus_ofcr',
}, {
  // Same options as passed to MongoClient.
  useNewUrlParser: true,
});

// Change the tenant (optional).
// Now accessing Firehouse data.
base.tenant('cygnus_fhc');

const run = async () => {
  // Return the platform DB instance.
  const db = await base.db('platform');

  // Return the content collection from the platform DB.
  const collection = await base.collection('platform.content');

  // Find content by ID.
  // If not found, will return `null`
  const content1 = await base.findById('platform.content', 12345678, { name: 1 });

  // Find content by ID, but throw error if not found.
  const content2 = await base.strictFindById('platform.content', 12345678, { name: 1 });

  // Count content records
  const count = await base.countDocuments('platform.content');
};
run();
```

## Instance Methods
All methods return a `Promise` and, as such, can be used within `async` functions. 🤘

### `base.db(modelSpace)`
Returns the `Db` instance for the provided modelspace.
```js
const go = async () => {
  // Get the platform DB instance.
  const db = base.db('platform');
};
go();
```

### `base.collection(modelName)`
Returns the `Collection` instance for the provided model.
```js
const go = async () => {
  // Get the content collection instance.
  const collection = base.collection('platform.content');
};
go();
```

### `base.findById(modelName, id[, options])`
Returns a model document from the database by ID.

### `base.strictFindById(modelName, id[, options])`
### `base.findOne(modelName[, query][, options])`
### `base.strictFindOne(modelName[, query][, options])`
### `base.find(modelName[, query][, options])`
### `base.count(modelName[, query][, options])`
### `base.distinct(modelName, field[, query][, options])`

