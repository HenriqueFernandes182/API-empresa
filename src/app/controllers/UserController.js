import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { email } = req.body;

      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        throw Error('usuario já cadastrado');
      }

      const user = await User.create(req.body);

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['name', 'email'],
      });

      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.status(401).json({ error: 'usuario não encontrado' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'senha invalida' });
      }

      const { name } = await user.update(req.body);
      return res.json({ user: { uid, name, email } });
    } catch (error) {
      return res.json({ error });
    }
  }
}
export default new UserController();
