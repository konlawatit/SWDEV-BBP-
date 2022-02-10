import React, { useEffect } from "react";
import { useSession, signIn, signOut, getProviders, getCsrfToken } from "next-auth/react"
import Router from "next/router";

const Login = ({file}) => {
    const { data: session } = useSession()
    // const session = data.session
    // console.log('data',data)
    // const session = null
    
    if (session) {
        console.log(session)
        return (
          <>
          <img src={file} />
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
      return (
        <>
        <img src={file} />
          Not signed in <br />
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )
}

  
export default Login
