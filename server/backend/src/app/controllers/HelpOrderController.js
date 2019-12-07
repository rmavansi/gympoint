import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const student_id = req.params.id;
    const { question, answer, answer_at } = req.body;

    /**
     * Check if student_id exists
     */
    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
      answer,
      answer_at,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const student_id = req.params.id;

    /**
     * Check if student_id exists
     */
    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    const helpOrder = await HelpOrder.findAll({
      where: { student_id },
    });

    return res.status(200).json(helpOrder);
  }
}

export default new HelpOrderController();
