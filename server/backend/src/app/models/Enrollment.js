import Sequelize, { Model } from 'sequelize';
import { isBefore, isAfter } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Member, { foreignKey: 'member_id', as: 'member' });
    this.belongsTo(models.Membership, {
      foreignKey: 'membership_id',
      as: 'membership',
    });
  }
}

export default Enrollment;
