module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Groups', {
    name: DataTypes.STRING,
    permission: DataTypes.ARRAY(DataTypes.STRING)
  });
  Group.associate = function (models) {
    // models.Group.belongsToMany(models.Product, {
    //   through: 'UserGroups',
    //   as: 'users',
    //   foreignKey: 'groupId',
    //   otherKey: 'userId'
    // });
  };
  return Group;
};
