import Sequelize, { Model } from 'sequelize';

class EmployeeRole extends Model {
  static init(sequelize) {
    super.init(
      {
        employee_uid: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'employees',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        role_uid: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Role, {
      as: 'role_name',
      foreignKey: 'role_uid',
    });
  }
}

export default EmployeeRole;
