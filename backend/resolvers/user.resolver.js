import { use } from "passport";
import { users } from "../dummyData/data.js";
import bcrypt from "bcrypt";
const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, user, email, password } = input;
        if ((username || user || email || password) === null) {
          throw new Error("Please fill all the fields");
        }
        const existUser = await users.fineOne({ username: username });
        if (existUser) {
          throw new Error("User already exist");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
          username,
          user,
          email,
          password: hash,
        };

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (err) {
        console.error("Error in signup", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    Query: {
      users: () => {
        return users;
      },
      user: (_, { userId }) => {
        return users.find((user) => user._id === userId);
      },
    },
  },
};

export default userResolver;
