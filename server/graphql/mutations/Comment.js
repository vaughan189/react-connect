const addComment = {
    resolve: (parent, {
        authorId,
        postId,
        commentText
    }, {
        db
    }, info) => db.comment.create({
        authorId,
        postId,
        commentText
    }),
}


module.exports = {
    addComment
}