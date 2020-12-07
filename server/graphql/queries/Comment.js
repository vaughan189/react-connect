const Comment = {
    author: (parent, args, {
        db
    }, info) => parent.getAuthor()
}

module.exports = {
    Comment,
}