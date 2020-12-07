const { POST_ADDED } = require("../../constants/constants");

const postAdded = {
    resolve: (payload) => {
        return {
            mutation: payload.mutation,
            post: payload.data,
        };
    },
    subscribe: ( parent, args, { pubsub }) => pubsub.asyncIterator([POST_ADDED]),
}

module.exports = { postAdded }