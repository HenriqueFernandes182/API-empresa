module.exports = {
  up: async (queryInterface, Sequelize) => {
 await queryInterface.createTable('companies', {
  uid: {
    allowNull: false,
    type: Sequelize.UUID,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  address: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  created_at: { type: Sequelize.DATE, allowNull: false },
  updated_at: { type: Sequelize.DATE, allowNull: false },
 });
  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('companies');
  },
};
