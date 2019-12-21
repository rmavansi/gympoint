import { subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import Sequelize from 'sequelize';
import Checkin from '../schemas/checkin';
import Member from '../models/Member';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async store(req, res) {
    const member_id = req.params.id;

    /**
     * Check if member_id exists
     */
    const member = await Member.findAll({
      where: { id: member_id },
    });

    if (!member) {
      return res.status(400).json({ error: 'Member does not exist.' });
    }

    /**
     * Check if member has an active membership
     */

    const checkActiveEnrollment = await Enrollment.findOne({
      where: {
        member_id,
        start_date: { [Sequelize.Op.lte]: new Date() },
        end_date: { [Sequelize.Op.gte]: new Date() },
      },
    });

    if (!checkActiveEnrollment) {
      return res
        .status(400)
        .json({ error: 'Member does not have an active membership.' });
    }

    /**
     * Get all checkins within last 7 days
     */
    const check7days = await Checkin.find({
      member: member_id,
    })
      .gte('createdAt', subDays(endOfDay(new Date()), 7))
      .lte('createdAt', endOfDay(new Date()))
      .countDocuments();

    /**
     * Check if member has more than 5 checkins within last 7 days
     */
    if (check7days > 4) {
      const nextCheckin = await Checkin.find({
        member: member_id,
      })
        .gte('createdAt', subDays(endOfDay(new Date()), 7))
        .lte('createdAt', endOfDay(new Date()))
        .sort({ createdAt: -1 });
      return res.status(400).json({
        error: `You cannot check in more than 5 times within last 7 days! Check in after: ${startOfDay(
          addDays(nextCheckin[4].createdAt, 7)
        )}.`,
      });
    }

    const checkIn = await Checkin.create({
      member: member_id,
    });

    return res.json(checkIn);
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

    const checkin = await Checkin.find({
      member: member_id,
    }).sort({ createdAt: 1 });

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
