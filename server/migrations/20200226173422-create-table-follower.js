'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('follow', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        followerId: {
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
      .then(() => {
        return Promise.all([
          queryInterface.addConstraint('follow', ['authorId'], {
            type: 'foreign key',
            name: 'fk_followersAuthorId',
            references: {
              table: 'author',
              field: 'id',
            },
          }),
          queryInterface.addConstraint('follow', ['followerId'], {
            type: 'foreign key',
            name: 'fk_followersFollowerId',
            references: {
              table: 'author',
              field: 'id',
            },
          }),
        ]);
      });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
      queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'),
      queryInterface.dropTable('follow'),
    ]);
  }
};
