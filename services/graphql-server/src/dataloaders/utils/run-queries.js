const { keys } = Object;

/**
 * Given a query map input, will execute a query+projection for each
 * item, and return an arrayed-promise of each query.
 *
 * For example, given a `queryMap` of:
  ```
  {
    '_id|alias': {
      ids: [ 56174, 56203, 56211, 56212, 56221, 56374, 56397 ],
      projection: { _id: 1, alias: 1 }
    },
    '_id|alias|name': {
      ids: [ 56161 ],
      projection: { _id: 1, alias: 1, name: 1 }
    }
  }
  ```
 * And a `modelName` of `website.Section`, will return a Promise
 * of results for the following queries:
  ```
  [
    basedb.find('website.Section',
      { _id: { $in: [ 56174, 56203, 56211, 56212, 56221, 56374, 56397 ] } },
      { projection: { _id: 1, alias: 1 } },
    ),
    basedb.find('website.Section',
      { _id: { $in: [ 56161 ] } },
      { projection: { _id: 1, alias: 1, name: 1 } },
    ),
  ]
  ```
 * Utlimately, the result sets of the promises would be:
  ```
  [
    [
      { _id: 56174, alias: 'tactical/firearms/handguns' },
      { _id: 56203, alias: 'tactical/swat/knives-tools' },
      { _id: 56211, alias: 'training-careers/domestic-response' },
      { _id: 56212, alias: 'training-careers/education' },
      { _id: 56221, alias: 'on-the-street' },
      { _id: 56374, alias: 'command-hq' },
      { _id: 56397, alias: 'command-hq/supplies-services/recognition-accreditation' },
    ],
    [
      { _id: 56161, alias: 'tactical/firearm-accessories/holsters', name: 'Holsters' },
    ],
  ]
  ```
 */
module.exports = ({
  queryMap,
  basedb,
  modelName,
}) => Promise.all(keys(queryMap).map((key) => {
  const v = queryMap[key];
  const { ids, projection, queries } = v;
  const query = { _id: { $in: ids }, $or: queries };
  return basedb.find(modelName, query, { projection });
}));
