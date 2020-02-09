const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  });
  User.associate = function (models) {
    // User.belongsToMany(models.Group, {
    //   through: 'UserGroups',
    //   as: 'groups',
    //   foreignKey: 'userId',
    // });
  };
  return User;
};

export default UserModel;
