const like = {
    resolve: (parent, {
        authorId,
        postId
    }, {
        db
    }, info) => db.like.create({
        authorId,
        postId
    }),
}

const unLike = {
    resolve: (parent, {
        authorId,
        postId
    }, {
        db
    }, info) => db.like.destroy({
        where: {
            authorId,
            postId
        }
    }),
}

module.exports = {
    like,
    unLike
}