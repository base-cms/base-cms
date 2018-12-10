/**
 * Takes array of result sets and creates a result hash map
 * based on each document id.
 *
 * For example, given the `resultSets` of:
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
 * The follow hash map would be created:
  ```
  {
    '56174': { _id: 56174, alias: 'tactical/firearms/handguns' },
    '56203': { _id: 56203, alias: 'tactical/swat/knives-tools' },
    '56211': { _id: 56211, alias: 'training-careers/domestic-response' },
    '56212': { _id: 56212, alias: 'training-careers/education' },
    '56221': { _id: 56221, alias: 'on-the-street' },
    '56374': { _id: 56374, alias: 'command-hq' },
    '56397': { _id: 56397, alias: 'command-hq/supplies-services/recognition-accreditation' },
    '56161': { _id: 56161, alias: 'tactical/firearm-accessories/holsters', name: 'Holsters' },
  }
  ```
 * This hash is then mapped against the original keys provided to the data loader.
 * This ultimately allows results to be returned from the data loader
 * in the order the keys were requested.
 */
module.exports = (resultSets, keys) => {
  const resultHash = resultSets
    .reduce((o, docs) => docs.reduce((h, doc) => ({ ...h, [doc._id]: doc }), o), {});
  return keys.map(([id]) => (resultHash[id] || null));
};
