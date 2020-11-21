const mongoose = require('mongoose');

const { database: { url, name } } = require(`./config/${process.env.NODE_ENV || 'development'}`);

module.exports = () => new Promise((res, rej) => {
  const connectionConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(`mongodb://${url}/${name}`, connectionConfig);

  const db = mongoose.connection;
  console.log('connecting to database...');

  db.on('error', (e) => {
    console.error('database connection error:', e);
    rej(e);
  });

  db.once('open', () => {
    console.log('successful connection to the database');
    res();
  });
});
