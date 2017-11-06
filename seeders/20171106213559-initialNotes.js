'use strict';
const faker = require('faker');
const {User} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let UserId = await User.findOne().then(user => user.id);
    return queryInterface.bulkInsert('Notes', [{
      title: 'This is actually working',
      content: 'Noice',
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      UserId: UserId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
