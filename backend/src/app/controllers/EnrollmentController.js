import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Member from '../models/Member';
import Membership from '../models/Membership';
import Notification from '../schemas/notification';

import MembershipMail from '../jobs/MembershipMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      member_id: Yup.number()
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

    const { member_id, membership_id, start_date } = req.body;

    /**
     * Check if member_id exists
     */
    const member = await Member.findOne({
      where: { id: member_id },
    });

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
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
     * Check if member has an active enrollment
     */

    const enroll = await Enrollment.findAll({
      where: { member_id },
    });

    enroll.map(e => {
      if (e.active) {
        return res.status(400).json({
          error:
            'Member already has a membership at this period, choose another date.',
        });
      }
      return '';
    });

    const enrollment = await Enrollment.create({
      member_id,
      membership_id,
      start_date: parseISO(start_date),
      end_date: addMonths(parseISO(start_date), membership.duration),
      price: membership.price * membership.duration,
    });

    /**
     * Notify member has a new membership
     */
    await Notification.create({
      content: `New membership for ${member.name}`,
      member: member.id,
    });

    const memberMail = { member, membership, enrollment };

    await Queue.add(MembershipMail.key, {
      memberMail,
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      // where: { member_id: req.params.id },
      order: ['start_date'],
      attributes: [
        'id',
        'member_id',
        'membership_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Member,
          as: 'member',
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
      member_id: Yup.number()
        .positive()
        .integer()
        .required(),
      membership_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist.' });
    }

    const { member_id, membership_id, start_date } = req.body;

    /**
     * Check if member_id is different
     */
    if (member_id !== enrollment.membership_id) {
      /**
       * Check if member_id exists
       */
      const member = await Member.findOne({
        where: { id: member_id },
      });

      if (!member) {
        return res.status(400).json({ error: 'Member does not exist.' });
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
      member_id,
      membership_id,
      start_date: parseISO(start_date),
      end_date: addMonths(parseISO(start_date), membership.duration),
      price: membership.price * membership.duration,
    });

    return res.json({
      id,
      member_id,
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
