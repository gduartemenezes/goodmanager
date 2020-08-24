import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class Worker extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        birthDate: Sequelize.DATE,
        admissionDate: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (worker) => {
      if (worker.password) {
        worker.password_hash = await bcrypt.hash(worker.password, 6);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Worker;
