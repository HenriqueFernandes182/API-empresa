module.exports = {
  up: async (queryInterface, Sequelize) => {
 await queryInterface.createTable('roles', {
   uid: {
     allowNull: false,
     type: Sequelize.UUID,
     primaryKey: true,
   },
   name: {
     allowNull: false,
     type: Sequelize.STRING,
   },
  company_uid: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'uid',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
   created_at: { type: Sequelize.DATE, allowNull: false },
   updated_at: { type: Sequelize.DATE, allowNull: false },
  });
},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('roles');
  },
};
