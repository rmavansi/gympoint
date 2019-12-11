import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class QuestionAnsweredMail {
  get key() {
    return 'QuestionAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrderAnswer } = data;

    await Mail.sendMail({
      to: `${helpOrderAnswer.member.name} <${helpOrderAnswer.member.email}>`,
      subject: 'Question answered',
      template: 'question',
      context: {
        member: helpOrderAnswer.member.name,
        question: helpOrderAnswer.question,
        answer: helpOrderAnswer.answer,
        answer_at: format(
          parseISO(helpOrderAnswer.answer_at),
          "do MMMM yyyy hh':'mm a"
        ),
      },
    });
  }
}

export default new QuestionAnsweredMail();
