const userTypeDef = `
#graphql
type User {
  _id: ID!
  username: String!
  name: String!
  profilePicture: String
  gender: String!
  email: String!
}
  
type Query {
  users: [User!]
  authUser: User
  user(userId:ID!): User
}

type Mutation {
  signUp(input: SignUpInput!): User
  signIn(input: SignInInput!): User
  logout: LogoutResponse
}

input SignUpInput {
  username: String!
  name: String!
  password: String!
  email: String
}

input SignInInput {
  username: String!
  password: String!
}

type LogoutResponse {
  message: String!
}
`;

export default userTypeDef;
