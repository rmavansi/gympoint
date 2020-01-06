import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Member from '../models/Member';

class MemberController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    /**
     * Check if email is unique
     */
    const memberExists = await Member.findOne({
      where: { email: req.body.email },
    });

    if (memberExists) {
      return res.status(400).json({ error: 'Member already exists.' });
    }

    const { id, name, email, age, weight, height } = await Member.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async index(req, res) {
    if (req.query.name) {
      const members = await Member.findAll({
        where: { name: { [Sequelize.Op.substring]: req.query.name } },
      });

      return res.json(members);
    }
    const members = await Member.findAll();
    return res.json(members);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
    }

    const { id, name, email, age, weight, height } = await member.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
    }

    // return res.json(member);

    await member.destroy();

    return res.json({ message: 'Member deleted successfully!' });
  }
}

export default new MemberController();
