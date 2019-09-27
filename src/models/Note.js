import { Sequelize } from 'sequelize';
import sequelize from '../database';

const Note = sequelize.define('note', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export default Note;
