module.exports = {
  up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'author',
      'profile', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      },
    );
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'author',
      'profile', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      },
    );
  },
};
