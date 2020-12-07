/* eslint arrow-body-style: 0 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('author', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
      })
      .then(() => queryInterface.addIndex('author', ['email']));
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
      queryInterface.removeIndex('author', ['email']),
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'),
      queryInterface.dropTable('author'),
    ]);
  },
};
