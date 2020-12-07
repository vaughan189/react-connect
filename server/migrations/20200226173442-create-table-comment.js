'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comment', {
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
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        commentText: {
          type: Sequelize.TEXT,
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
          queryInterface.addConstraint('comment', ['authorId'], {
            type: 'foreign key',
            name: 'fk_commentAuthorId',
            references: {
              table: 'author',
              field: 'id',
            },
          }),
          queryInterface.addConstraint('comment', ['postId'], {
            type: 'foreign key',
            name: 'fk_commentPostId',
            references: {
              table: 'post',
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
      queryInterface.dropTable('comment'),
    ]);
  }
};
