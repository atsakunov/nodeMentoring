module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('UserGroups', [{
        userId: 2,
        groupId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        groupId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserGroups', [{
      userId: 3
    }, {
      userId: 4
    }])
  }
};
