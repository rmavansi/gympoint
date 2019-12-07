require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'gpoint',
  database: 'gympoint',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
