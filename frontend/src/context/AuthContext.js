import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

// We use Context because all of React components, will need some global data
// Doing so, we avoid the prop spreading

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)
  const [userData, setUserData] = useState({})
  const history = useHistory()

  // async function getLoggedIn() {
  //   const loggedInResponse = await axios.get(
  //     'api/user/isLoggedIn'
  //   )
  //   setIsLoggedIn(loggedInResponse.data)
  // }

  // async function getUserData() {
  //   const userDataResponse = await axios.get('api/user')
  //   setUserData(userDataResponse.data.data)
  // }

  // useEffect(() => {
  //   getLoggedIn()
  //   if (isLoggedIn) getUserData()
  // }, [isLoggedIn])
  const getLoggedIn = async () => {
    const res = await axios.get("/api/user/isLoggedIn");
    setIsLoggedIn(res.data);
    return res.data;
  }
  const getUserData = async () => {
    const res = await axios.get("/api/user");
    setUserData(res.data.data);
  }

  useEffect(() => {
    const fetch = async () => {
      const loggedIn = await getLoggedIn();
      if (loggedIn){
        history.push("/")
        await getUserData();
      }
    };
    fetch();
  }, []);
 console.log(
  "userData", userData
 )

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, getLoggedIn, userData, setUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }

