import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StackOverflow from "./components/StackOverflow";
import Header from "./components/Header";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Auth from "./components/Auth";
import { useContext } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./feature/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import AuthContext from "./context/AuthContext";
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {
  const { getLoggedIn, setUserData, userData, isLoggedIn } = useContext(AuthContext)
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

  useEffect(() => {
     const checkLoggedIn = async () => {
    try {
      const response = await getLoggedIn(); // This likely hits your backend like `/api/auth/loggedIn`
      if (response?.data?.user) {
        setUserData(response.data.user); // Set the user data in context
      }
    } catch (error) {
      console.error("Error checking login status", error);
    }
  };

  checkLoggedIn();
  }, [isLoggedIn]);
  
 const PrivateRoute = ({ component: Component, ...rest }) => {
    const { getLoggedIn, setUserData, userData, isLoggedIn } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

  return (
    

    <div className="App">
      <Router>
        <Header />
        {/* {user && <p>Welcome, {user.displayName}</p>} */}
        <Switch>
          {/* {isLoggedIn === false && ( */}
          <Route exact path="/auth" component={Auth} />
          {/* {isLoggedIn === true && ( */}
            
            <PrivateRoute exact path="/" component={StackOverflow} />
            <PrivateRoute exact path="/add-question" component={AddQuestion} />
            <PrivateRoute exact path="/question" component={ViewQuestion} />
          
          
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
