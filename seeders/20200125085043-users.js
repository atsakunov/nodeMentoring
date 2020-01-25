'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
        login: 'John',
        password: '123456',
        age: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        login: 'Elena',
        password: '123456',
        age: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        login: 'Mike',
        password: '123456',
        age: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        login: 'Drue',
        password: '123456',
        age: 46,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        login: 'Olga',
        password: '123456',
        age: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      },
      {
        login: 'Nick',
        password: '123456',
        age: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      first_name: 'John'
    }, {
      first_name: 'Elena'
    }, {
      first_name: 'Mike'
    }, {
      first_name: 'Drue'
    }, {
      first_name: 'Olga'
    }, {
      first_name: 'Nick'
    }, ])
  }
};