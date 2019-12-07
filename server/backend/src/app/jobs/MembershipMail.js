import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class MembershipMail {
  get key() {
    return 'MembershipMail';
  }

  async handle({ data }) {
    const { studentMail } = data;

    await Mail.sendMail({
      to: `${studentMail.student.name} <${studentMail.student.email}>`,
      subject: 'Gympoint new membership',
      template: 'membership',
      context: {
        student: studentMail.student.name,
        title: studentMail.membership.title,
        price: studentMail.membership.price,
        start_date: format(
          parseISO(studentMail.enrollment.start_date),
          'do MMMM yyyy'
        ),
        end_date: format(
          parseISO(studentMail.enrollment.end_date),
          'do MMMM yyyy'
        ),
      },
    });
  }
}

export default new MembershipMail();
