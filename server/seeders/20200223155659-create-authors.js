const faker = require('faker');
const times = require('lodash.times')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const authors = times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }));
    return queryInterface.bulkInsert('author', authors);
  },

  down: (queryInterface, Sequelize) => {}
};
