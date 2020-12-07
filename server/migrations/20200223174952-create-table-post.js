/* eslint arrow-body-style: 0 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        authorId: {
          type: Sequelize.INTEGER,
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
      .then(() => queryInterface.addIndex('post', ['title']));
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
      queryInterface.removeIndex('post', ['title']),
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'),
      queryInterface.dropTable('post'),
    ]);
  },
};
