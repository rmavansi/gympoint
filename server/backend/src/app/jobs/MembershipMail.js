import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class MembershipMail {
  get key() {
    return 'MembershipMail';
  }

  async handle({ data }) {
    const { memberMail } = data;

    await Mail.sendMail({
      to: `${memberMail.member.name} <${memberMail.member.email}>`,
      subject: 'Gympoint new membership',
      template: 'membership',
      context: {
        member: memberMail.member.name,
        title: memberMail.membership.title,
        price: memberMail.membership.price,
        start_date: format(
          parseISO(memberMail.enrollment.start_date),
          'do MMMM yyyy'
        ),
        end_date: format(
          parseISO(memberMail.enrollment.end_date),
          'do MMMM yyyy'
        ),
      },
    });
  }
}

export default new MembershipMail();
