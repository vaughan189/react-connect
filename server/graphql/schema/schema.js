export default `
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    profile: String
    posts: [Post!]!
    follower: [Follower!]!
    following: [Following!]!
  }
  type Post {
    id: ID!
    title: String
    content: String!
    authorId: ID!
    author: Author!
    comments: [Comment!]!
    likes: [Like!]!
  }
  type Like {
    id: ID!
    authorId: ID!
    postId: ID!
    author: [Author!]!
  }
  type Follower {
    id: ID!
    authorId: ID!
    followerId: ID!
    author: [Author!]!
  }
  type Following {
    id: ID!
    authorId: ID!
    followerId: ID!
    author: [Author!]!
  }
  type Comment {
    id: ID!
    authorId: ID!
    postId: ID!
    commentText: String!
    author: Author!
  }
  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    author(id: ID!): Author
    authors: [Author!]!
    likes(postId: ID!): [Like!]!
    following(authorId: ID!): [Following!]!
    follower(authorId: ID!): [Follower!]!
  }
  type Mutation {
    createPost(title: String, content:String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, content:String!): [Int!]!
    deletePost(id: ID!): Int!
    login(email: String!, password:String!): LoginResponse!
    search(searchQuery: String!): [Author!]!
    follow(authorId: String!, followerId: String!): Follower!
    unFollow(authorId: String!, followerId: String!): Int!
    addComment(authorId: String!, postId: String!, commentText: String!): Comment!
    like(authorId: String!, postId: String!): Like!
    unLike(authorId: String!, postId: String!): Int!
    singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): File!
    updateUserProfilePicture(id: ID!, profile: String!): [Int!]!
  }
  type LoginResponse {
    code: Int!
    success: Boolean
    message: String
    author: Author
  }

  type Subscription {
    postAdded: PostSubscription!
  }

  type PostSubscription {
    mutation: String!
    post: Post!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`;