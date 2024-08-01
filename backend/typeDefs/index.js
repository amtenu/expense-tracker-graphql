import { mergeType } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js"; // Importing the user typeDef
import transactionsTypeDef from "./transaction.typeDef.js"; // Importing the transactions typeDef

const mergedTypeDefs = mergeType([userTypeDef, transactionsTypeDef]);

export default mergedTypeDefs;
// In the above code, we are merging the userTypeDef and transactionsTypeDef using the mergeType function from the @graphql-tools/merge package.
