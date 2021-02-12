import Company from '../models/Company';
import Employee from '../models/Employee';
import Role from '../models/Role';

class CompanyController {
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: ['uid', 'name', 'address'],
      });
      return res.json({ companies });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const company = await Company.findByPk(uid, {
        attributes: ['uid', 'name', 'address'],
        include: [
          {
            model: Employee,
            as: 'employees',
            attributes: ['uid', 'name', 'age', 'cpf'],
          },
          {
            model: Role,
            as: 'roles',
            attributes: ['uid', 'name'],
          },
        ],
      });
      return res.json({ company });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const company = await Company.create(req.body);
      return res.json({ company });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new CompanyController();
