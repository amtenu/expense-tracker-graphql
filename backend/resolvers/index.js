import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "../resolvers/user.resolver.js"; // Importing the user resolver
import transactionsResolver from "../resolvers/transactions.resolver.js"; // Importing the transactions resolver

const mergedResolvers = mergeResolvers([userResolver, transactionsResolver]);

export default mergedResolvers;
