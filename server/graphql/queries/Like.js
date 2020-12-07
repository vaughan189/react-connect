const Like = {
  author: (parent, args, {
    db
  }, info) => db.author.findAll({
    where: {
      id: parent.authorId
    }
  })
}

const likes = {
  resolve: (parent, {
    postId
  }, {
    db
  }, info) => db.like.findAll({
    where: {
      postId: postId
    }
  })
}

module.exports = {
  Like,
  likes
}