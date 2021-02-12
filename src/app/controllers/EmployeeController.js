import Employee from '../models/Employee';
import Company from '../models/Company';
import EmployeeRole from '../models/EmployeeRole';
import Role from '../models/Role';

class EmployeeController {
  async index(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: ['uid', 'name', 'age', 'cpf'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name', 'address'],
          },
        ],
      });
      return res.json({ employees });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const employee = await Employee.findByPk(uid, {
        attributes: ['uid', 'name', 'age', 'cpf'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name', 'address'],
          },
          {
            model: EmployeeRole,
            as: 'roles',
            attributes: ['role_uid'],
            include: [
              {
                model: Role,
                as: 'role_name',
                attributes: ['name'],
              },
            ],
          },
        ],
      });
      return res.json({ employee });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    const t = await Employee.sequelize.transaction();
    try {
      const employee = await Employee.create(req.body, {
        transaction: t,
      });

      const { roles } = req.body;

      await Promise.all(
        roles.map(async (role_uid) => {
          const role = await EmployeeRole.create(
            {
              employee_uid: employee.uid,
              role_uid,
            },
            { transaction: t }
          );

          return role;
        })
      );

      await t.commit();
      return res.json({ employee });
    } catch (error) {
      await t.rollback();
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new EmployeeController();
