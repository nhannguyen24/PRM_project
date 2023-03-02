const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('p4ryffdaygn1vgtl', 'dk11aj8slxoh5qc8', 'ztg3rirzatsat3cj', {
  host: 'frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false,
});

const connectionDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connectionDatabase();
