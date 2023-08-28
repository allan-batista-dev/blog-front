import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials, req) {
          const { email, password } = credentials as any;
          const res = await fetch(`${process.env.NEXTAUTH_URL}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
  
          const user = await res.json();
  
          console.log({ user });
  
          if (res.ok && user) {
            return { ...user, access_token: user.access_token };
          } else return null;
        },
      }),
    ],
  
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.access_token
        }
  
        return token
      },
  
      async session({ session, token }) {
      // Adicione o token de acesso ao objeto de usuário na sessão
      session.user = {
        ...session.user,
        access_token: token.accessToken as string,
      };
  
      return session;
    },
    },
  
    pages: {
      signIn: "/signin",
    },
  };

  const handler = NextAuth(authOptions)

  export {handler as GET, handler as POST}
