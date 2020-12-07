const Post = {
    author: (parent, args, context, info) => parent.getAuthor(),
    comments: (parent, args, {
        db
    }, info) => db.comment.findAll({
        where: {
            postId: parent.id
        }
    }),
    likes: (parent, args, {
        db
    }, info) => db.like.findAll({
        where: {
            postId: parent.id
        }
    })
}

const posts = {
    resolve: (parent, args, {
        db
    }, info) => db.post.findAll()
}

const post = {
    resolve: (parent, {
        id
    }, {
        db
    }, info) => db.post.findByPk(id),
}

module.exports = {
    Post,
    posts,
    post
};