const Author = {
    posts: (parent, args, context, info) => parent.getPosts(),
    following: (parent, args, {
        db
    }, info) => db.follow.findAll({
        where: {
            authorId: info.variableValues.id
        }
    }),
    follower: (parent, args, {
        db
    }, info) => db.follow.findAll({
        where: {
            followerId: info.variableValues.id
        }
    })
}
const authors = {
    resolve: (parent, args, {
        db
    }, info) => db.author.findAll()
}

const author = {
    resolve: (parent, {
        id
    }, {
        db
    }, info) => db.author.findByPk(id)
}

module.exports = {
    author,
    authors,
    Author
};