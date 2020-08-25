import { Model, Sequelize } from 'sequelize';

class Report extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        table: Sequelize.STRING,
        column: Sequelize.STRING,
        parameters: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Report;
