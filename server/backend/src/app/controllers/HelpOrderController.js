import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Member from '../models/Member';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const member_id = req.params.id;
    const { question, answer, answer_at } = req.body;

    /**
     * Check if member_id exists
     */
    const member = await Member.findOne({
      where: { id: member_id },
    });

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
    }

    const helpOrder = await HelpOrder.create({
      member_id,
      question,
      answer,
      answer_at,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const member_id = req.params.id;

    /**
     * Check if member_id exists
     */
    const member = await Member.findOne({
      where: { id: member_id },
    });

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
    }

    const helpOrder = await HelpOrder.findAll({
      where: { member_id },
      include: [
        {
          model: Member,
          as: 'member',
          attributes: ['name'],
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ],
    });

    return res.status(200).json(helpOrder);
  }
}

export default new HelpOrderController();
