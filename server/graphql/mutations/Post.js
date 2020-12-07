const { POST_ADDED } = require("../../constants/constants");

const createPost = {
    resolve: async (parent, { title, content, authorId }, { db, pubsub }, info) => {
        const post = await db.post.create({
            title: title,
            content: content,
            authorId: authorId
        })
        pubsub.publish(POST_ADDED, { mutation: POST_ADDED, data: post });
        return post
    }
}

const updatePost = {
    resolve: (parent, { title, content, id }, { db }, info) => 
    db.post.update({
        title: title,
        content: content
    }, {
        where: {
            id: id
        }
    })
}

const deletePost = {
    resolve: (parent, {
        id
    }, {
        db
    }, info) => db.post.destroy({
        where: {
            id: id
        }
    }),
}

const search = {
    resolve: (parent, {
        searchQuery
    }, {
        db,
        Op
    }, info) => db.author.findAll({
        where: {
            [Op.or]: [{
                    firstName: {
                        [Op.like]: '%' + searchQuery + '%'
                    }
                },
                {
                    lastName: {
                        [Op.like]: '%' + searchQuery + '%'
                    }
                },
                {
                    email: {
                        [Op.like]: '%' + searchQuery + '%'
                    }
                }
            ]
        }
    })
}


module.exports = {
    createPost,
    updatePost,
    deletePost,
    search
}