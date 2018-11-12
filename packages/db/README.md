# BaseCMS DB
The BaseCMS database driver. Requires direct MongoDB access.

## Installation
```
yarn add @base-cms/db
```

## Usage
```js
const BaseDB = require('@base-cms/db');

// Create the instance.
const base = new BaseDB({
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
  // Find content by ID.
  // If not found, will return `null`
  const content1 = await base.findById('platform.Content', 12345678);

  // Find content by ID, but throw error if not found.
  const content2 = await base.strictFindById('platform.Content', 12345678);

  // Count content records
  const count = await base.count('platform.Content');
};
run();
```

## API
### Instance Methods
All methods return a `Promise` and, as such, can be used within `async` functions. 🤘

#### `base.findById(modelName, id[, options])`
Finds a single document for the provided model name and ID.
```js
const go = async () => {
  const content = await base.findById('platform.Content', 12345678);

  // Only return specific fields
  const content2 = await base.findById('platform.Content', 12345678, {
    projection: { name: 1, published: 1 },
  });
};
go();
```

#### `base.strictFindById(modelName, id[, options])`
Finds a single document for the provided model name and ID. Will throw an error if the document is not foun
```js
const go = async () => {
  // Will throw if not found. Handle in `.catch`, etc.
  const content = await base.strictFindById('platform.Content', 12345678);
};
go().catch(err => console.log(err));
```

#### `base.findOne(modelName[, query][, options])`
Finds a single document for the provided model name and (optional) query criteria.
```js
const go = async () => {
  const content = await base.findOne('platform.Content', {
    _id: 12345678,
    status: 1,
  });

  // Only return specific fields
  const content2 = await base.findOne('platform.Content', {
    _id: 12345678,
    status: 1,
  }, {
    projection: { name: 1, published: 1 },
  });
};
go();
```

#### `base.strictFindOne(modelName[, query][, options])`
Finds a single document for the provided model name and (optional) query criteria. Will throw an error if the document is not found.
```js
const go = async () => {
  // Will throw if not found.
  const content = await base.strictFindOne('platform.Content', {
    _id: 12345678,
    status: 1,
  });
};
go();
```

#### `base.find(modelName[, query][, options])`
Finds a multiple documents for the provided model name and (optional) query criteria. Will return a MongoDB cursor object.
```js
const go = async () => {
  // Will return a MongoDB cursor for iteration.
  const cursor = await base.find('platform.Content', {
    published: { $lte: new Date() },
    status: 1,
  });

  // Apply sorting.
  // Either as an option arg...
  // See http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#find
  const cursor2 = await base.find('platform.Content', {
    published: { $lte: new Date() },
    status: 1,
  }, {
    sort: [['name', 1]],
  });
  // Or directly on the cursor.
  // See http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html
  cursor2.sort([['name', -1]]);
};
go();
```

#### `base.count(modelName[, query][, options])`
Counts the number of documents for the provided model name and (optional) query criteria.
```js
const go = async () => {
  // Return number of active content documents.
  const num = await base.count('platform.Content', { status: 1 });
};
go();
```

#### `base.distinct(modelName, field[, query][, options])`
Returns distinct values for the provided model name, key (field name) and (optional) query criteria.
```js
const go = async () => {
  // Return a distinct list of published dates of active content documents.
  const dates = await base.distinct('platform.Content', 'published', { status: 1 });
};
go();
```

#### `base.db(namespace[, options])`
Returns a MongoDB `Db` instance for the provided namespace.
```js
const go = async () => {
  // Get the platform DB instance.
  const db = base.db('platform');
};
go();
```

#### `base.collection(namespace, resource[, options])`
Returns a MongoDB `Collection` instance for the provided namespace and resource
```js
const go = async () => {
  // Get the content collection instance.
  const collection = base.collection('platform', 'Content');
};
go();
```

#### `base.tenant(key)`
Set/change the active tenant. Note: this method does _not_ return a `Promise`.
```js
base.tenant('some_tenant');
```

### Static Methods
Utility/helper methods.

#### `coerceID(id)`
Coerces a string ID to either a MongoDB ObjectID or an integer. If the `id` value is not a string, or does not match the requirements for the above, the `id` value will be returned as-is.
```js
const BaseDB = require('@base-cms/db');
const { ObjectID } = require('mongodb');

// Becomes the number `1234`
const id1 = BaseDB.coerceID('1234');

// Becomes ObjectID('5b0d4edb74265bb4c8edc863')
const id2 = BaseDB.coerceID('5b0d4edb74265bb4c8edc863');

// Stays as an ObjectID
const id3 = BaseDB.coerceID(ObjectID('5bbb7920adff35d154b1c099'));

// Is left as-is
const id4 = BaseDB.coerceID('some-value');
```

#### `extractMutationValue(doc, type, field)`
Extracts a mutation value from a document for the provided type and field.
```js
const BaseDB = require('@base-cms/db');

// Get the `Website.name` mutation value. Will return `Foo` since the mutation is set.
const doc1 = {
  mutations: {
    Website: {
      name: 'Foo',
    },
  },
};
const websiteName = BaseDB.extractMutationValue(doc, 'Website', 'name');

// Get the `Magazine.name` mutation value. Will return `null` since mutation is not found.
const magazibneName = BaseDB.extractMutationValue(doc, 'Magazine', 'name');
```
