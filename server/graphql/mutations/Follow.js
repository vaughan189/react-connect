const follow = {
    resolve: (parent, {
        authorId,
        followerId
    }, {
        db
    }, info) => db.follow.create({
        authorId,
        followerId
    }),
}

const unFollow = {
    resolve: (parent, {
        authorId,
        followerId
    }, {
        db
    }, info) => db.follow.destroy({
        where: {
            authorId,
            followerId
        }
    })
}


module.exports = {
    follow,
    unFollow
}