const login = {
    resolve: async (parent, {
        email,
        password
    }, {
        db
    }, info) => {
        const user = await db.author.findAll({
            where: {
                email: email
            }
        })
        if (!user[0]) {
            return {
                code: 401,
                success: false,
                message: "Email Does Not Exist"
            }
        }
        if (user[0].dataValues.password !== password) {
            return {
                code: 401,
                success: false,
                message: "Invalid Password"
            }
        }
        return {
            code: 200,
            success: true,
            message: "Login Successful",
            author: user[0].dataValues
        }
    }
}

module.exports = {
    login
}