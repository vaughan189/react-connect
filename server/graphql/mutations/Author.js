const updateUserProfilePicture = {
    resolve: (parent, { id, profile }, { db }, info) => 
    db.author.update({ profile: profile},
        { where: { id: id }
    })
}

module.exports = {
    updateUserProfilePicture
}