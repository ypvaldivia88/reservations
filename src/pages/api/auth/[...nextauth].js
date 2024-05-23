// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

async function login(credentials) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);

    if (!isMatch) {
      throw new Error("Wrong password");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error logging in");
  }
}

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          return await login({
            email: credentials.email,
            password: credentials.password,
          });
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user._id;
      }
      console.log("token:", token);
      return token;
    },
    async session(session, token) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("session:", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
