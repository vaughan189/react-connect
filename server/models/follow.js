module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('follow', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        authorId: DataTypes.INTEGER,
        followerId: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
    });

    Follow.associate = (models) => {
        Follow.belongsTo(models.author, {
            foreignKey: 'authorId',
            targetKey: 'id'
        });
        Follow.belongsTo(models.author, {
            foreignKey: 'followerId',
            targetKey: 'id'
        });
    };
    return Follow;
}