module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Groups', {
    name: DataTypes.STRING,
    permission: DataTypes.ARRAY(DataTypes.STRING)
  });
  Group.associate = function (models) {
    models.Groups.belongsToMany(models.Groups, {
      through: models.UserGroup,
      as: 'user',
      foreignKey: 'groupId',
      otherKey: 'userId'
    });
  };
  return Group;
};
