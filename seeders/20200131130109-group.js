module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [{
        name: 'Admin',
        permission: ['READ', 'WRITE', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User',
        permission: ['Read', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User2',
        permission: ['Read', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User3',
        permission: ['Read', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User4',
        permission: ['Read', 'UPLOAD_FILES'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', [{
      name: 'Admin'
    }]);
  }
};
