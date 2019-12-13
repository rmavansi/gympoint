import * as Yup from 'yup';
import Membership from '../models/Membership';

class MembershipController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, title, duration, price } = await Membership.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const memberships = await Membership.findAll({
      order: ['duration'],
    });
    return res.json(memberships);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const membership = await Membership.findByPk(req.params.id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exist.' });
    }

    const { id, title, duration, price } = await membership.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const membership = await Membership.findByPk(req.params.id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exist.' });
    }

    await membership.destroy();

    return res.json({ message: 'Membership deleted successfully!' });
  }
}

export default new MembershipController();
