import NextAuth from "next-auth"
import axios from "axios"
import GoogleProvider from "next-auth/providers/google"
import { getToken } from "next-auth/jwt"


export default NextAuth({
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly openid https://www.googleapis.com/auth/userinfo.email"
          }
        },
        
      })
    // ...add more providers here
  ],
  pages: {
      signIn: '/accounting'
  },
  callbacks: {
    async jwt({ token, account }) {
      // console.log(account)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        const payloads = {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          token_type: account.token_type,
          expiry_date: account.expires_at,
          id_token: account.id_token
        }

        // axios.post(`${process.env.SERVER_URL}/auth/signin`, {
        //   payloads: payloads
        // }).then(response => {
        //   console.log('response', response)
        // }).catch(err => {
        //   console.log('err', err)
        // })

      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      // console.log('session', session)
      // console.log(token, session)
      return session
    }
  }
})