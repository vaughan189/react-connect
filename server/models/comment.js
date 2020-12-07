module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        authorId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        commentText: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.post, {
            foreignKey: 'postId'
        });
        Comment.belongsTo(models.author, {
            foreignKey: 'authorId'
        });
    };
    return Comment;
}