module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    freezeTableName: true,
  });

  Author.associate = (models) => {
    Author.hasMany(models.post);
    Author.hasMany(models.follow);
  };

  return Author;
}