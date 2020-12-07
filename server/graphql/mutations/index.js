const { createPost, updatePost, deletePost, search } = require('./Post');
const { addComment } = require('./Comment');
const { follow, unFollow } = require('./Follow');
const { like, unLike } = require('./Like');
const { login } = require('./Login');
const { singleUpload, singleUploadStream} = require('./Upload')
const { updateUserProfilePicture } = require('./Author');

const Mutation = {
    createPost,
    updatePost,
    deletePost,
    search,
    addComment,
    follow,
    unFollow,
    like,
    unLike,
    login,
    singleUpload,
    singleUploadStream,
    updateUserProfilePicture
}

module.exports = { Mutation }