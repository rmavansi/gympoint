import { subDays, addDays, startOfDay, endOfDay } from 'date-fns';
import Sequelize from 'sequelize';
import Checkin from '../schemas/checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async store(req, res) {
    const student_id = req.params.id;

    /**
     * Check if student_id exists
     */
    const student = await Student.findAll({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist.' });
    }

    /**
     * Check if student has an active membership
     */

    const checkActiveEnrollment = await Enrollment.findOne({
      where: {
        student_id,
        start_date: { [Sequelize.Op.lte]: new Date() },
        end_date: { [Sequelize.Op.gte]: new Date() },
      },
    });

    if (!checkActiveEnrollment) {
      return res
        .status(400)
        .json({ error: 'Student does not have an active membership.' });
    }

    /**
     * Get all checkins within last 7 days
     */
    const check7days = await Checkin.find({
      student: student_id,
    })
      .gte('createdAt', subDays(endOfDay(new Date()), 7))
      .lte('createdAt', endOfDay(new Date()))
      .countDocuments();

    /**
     * Check if student has more than 5 checkins within last 7 days
     */
    if (check7days > 4) {
      const nextCheckin = await Checkin.find({
        student: student_id,
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
      student: student_id,
    });

    return res.json(checkIn);
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

    const checkin = await Checkin.find({
      student: student_id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
