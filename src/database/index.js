import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Worker from '../app/models/Worker';

const models = [Worker];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
