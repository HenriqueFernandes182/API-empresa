require('dotenv').config();

module.exports = {
  url: process.env.DATABASE_URL,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
