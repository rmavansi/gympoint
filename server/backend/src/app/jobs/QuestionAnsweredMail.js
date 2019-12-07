import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class QuestionAnsweredMail {
  get key() {
    return 'QuestionAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrderAnswer } = data;

    await Mail.sendMail({
      to: `${helpOrderAnswer.student.name} <${helpOrderAnswer.student.email}>`,
      subject: 'Question answered',
      template: 'question',
      context: {
        student: helpOrderAnswer.student.name,
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
