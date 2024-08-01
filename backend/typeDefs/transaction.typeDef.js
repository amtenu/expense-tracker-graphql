const transactionsTypeDef = `#graphql
type Transaction {
    _id: ID!
    user: ID!
    type: String!
    paymentType: String!
    description: String
    category: String!
    amount: Float!
    location: String
    date: String!
    }

type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
    }

type Mutation {
    addTransaction(input: AddTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
  }

  input AddTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
    }
    
 input UpdateTransactionInput {      
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    date: String
    location: String
  }
`;

export default transactionsTypeDef;
