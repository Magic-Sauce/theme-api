const Datastore = require('nedb-promises');

import DataStoreType from 'nedb-promises';
const themeDb: DataStoreType = new Datastore({
  filename: './theme.data.db',
  autoload: true,
});

export { themeDb };
