module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );

  Like.associate = (models) => {
    Like.belongsTo(models.post, {
      foreignKey: "postId",
    });
    Like.belongsTo(models.author, {
      foreignKey: "authorId",
    });
  };
  return Like;
};
