import * as Yup from 'yup';
import { addMonths, parseISO, areIntervalsOverlapping } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Membership from '../models/Membership';
import Notification from '../schemas/notification';

import MembershipMail from '../jobs/MembershipMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      membership_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { student_id, membership_id, start_date } = req.body;

    /**
     * Check if student_id exists
     */
    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    /**
     * Check if membership_id exists
     */
    const membership = await Membership.findOne({
      where: { id: membership_id },
    });

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exist.' });
    }

    /**
     * Check if student has an enrollment overlap
     */

    const enroll = await Enrollment.findAll({
      where: { student_id },
    });

    const end_date = addMonths(parseISO(start_date), membership.duration);
    const sDate = parseISO(start_date);

    enroll.map(e => {
      const startDate = e.start_date;
      const endDate = e.end_date;

      if (
        areIntervalsOverlapping(
          { start: startDate, end: endDate },
          { start: sDate, end: end_date }
        )
      ) {
        return res.status(400).json({
          error:
            'Student already has a membership at this period, choose another date.',
        });
      }
      return '';
    });

    const enrollment = await Enrollment.create({
      student_id,
      membership_id,
      start_date: parseISO(start_date),
      end_date,
      price: membership.price * membership.duration,
    });

    /**
     * Notify student has a new membership
     */
    await Notification.create({
      content: `New membership for ${student.name}`,
      student: student.id,
    });

    const studentMail = { student, membership, enrollment };

    await Queue.add(MembershipMail.key, {
      studentMail,
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      where: { student_id: req.params.id },
      order: ['start_date'],
      attributes: [
        'id',
        'student_id',
        'membership_id',
        'start_date',
        'end_date',
        'price',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Membership,
          as: 'membership',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      membership_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist.' });
    }

    const { student_id, membership_id, start_date } = req.body;

    /**
     * Check if student_id is different
     */
    if (student_id !== enrollment.membership_id) {
      /**
       * Check if student_id exists
       */
      const student = await Student.findOne({
        where: { id: student_id },
      });

      if (!student) {
        return res.status(400).json({ error: 'Student does not exist.' });
      }
    }

    /**
     * Check if membership_id exists
     */
    const membership = await Membership.findOne({
      where: { id: membership_id },
    });

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exist.' });
    }

    const { id, end_date, price } = await enrollment.update({
      student_id,
      membership_id,
      start_date: parseISO(start_date),
      end_date: addMonths(parseISO(start_date), membership.duration),
      price: membership.price * membership.duration,
    });

    return res.json({
      id,
      student_id,
      membership_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist.' });
    }

    await enrollment.destroy();

    return res.json({ message: 'Enrollment deleted successfully!' });
  }
}

export default new EnrollmentController();
