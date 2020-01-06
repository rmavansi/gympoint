import Member from '../models/Member';

class MemberLoginController {
  async index(req, res) {
    const { id } = req.params;
    const member = await Member.findOne({ where: { id } });
    if (!member) {
      return res.status(400).json({ error: 'Member not found' });
    }
    return res.json(member);
  }
}

export default new MemberLoginController();
