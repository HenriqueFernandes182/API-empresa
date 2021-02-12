import Role from '../models/Role';
import Company from '../models/Company';

class RoleController {
  async index(req, res) {
    try {
      const roles = await Role.findAll({
        attributes: ['uid', 'name'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name'],
          },
        ],
      });
      return res.json({ roles });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const role = await Role.findByPk(uid, {
        attributes: ['uid', 'name'],
        include: [
          {
            model: Company,
            as: 'company',
            attributes: ['uid', 'name'],
          },
        ],
      });
      return res.json({ role });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const role = await Role.create(req.body);
      return res.json({ role });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new RoleController();
