import {React, useState} from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import CreatePost from "./CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import './App.css';

function App() {

  //handle authentification check
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };


  return( 
    //returns availiable routes, where dashboard is accessible by authentified users
    <Container 
      className="d-flex align-items-center justify-content-center border-0 "
      style={{ minHeight: '100vh' }}
    >
      <div className=" border-0 cards">
        <Router>
          <AuthProvider>
          <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/create-post" component={CreatePost} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App;
