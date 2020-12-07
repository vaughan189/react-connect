const Follower = {
    author: (parent, args, {
        db
    }, info) => db.author.findAll({
        where: {
            id: parent.authorId
        }
    })
}

const Following = {
    author: (parent, args, {
        db
    }, info) => db.author.findAll({
        where: {
            id: parent.followerId
        }
    }),
}

const following = {
    resolve: (parent, {
        authorId
    }, {
        db
    }, info) => db.follow.findAll({
        where: {
            authorId: authorId
        }
    }),
}
const follower = {
    resolve: (parent, {
        authorId
    }, {
        db
    }, info) => db.follow.findAll({
        where: {
            followerId: authorId
        }
    }),
}

module.exports = {
    Follower,
    Following,
    following,
    follower
}