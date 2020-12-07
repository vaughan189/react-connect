const faker = require('faker');
const times = require('lodash.times')
const random = require('lodash.random')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const posts = times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10)
    }))
    return queryInterface.bulkInsert('post', posts);
  },

  down: (queryInterface, Sequelize) => {}
};
