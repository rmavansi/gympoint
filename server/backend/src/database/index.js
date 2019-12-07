import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import Student from '../app/models/Student';
import Membership from '../app/models/Membership';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';
import databaseConfig from '../config/database';

const models = [User, Student, Membership, Enrollment, HelpOrder];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
