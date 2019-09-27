import { Sequelize } from 'sequelize';
import { DBkey } from '../keys';

const sequelize = new Sequelize('notes', 'exroot', DBkey, {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
