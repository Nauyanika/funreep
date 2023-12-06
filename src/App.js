
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style/singup.css';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import React from 'react';
import Login from "./components/Login"
import DashboardLayout from './components/DashboardLayout'
import useToken from './Auth/useToken';

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Router>
      <Switch>
        <div className="wrapper">
          <DashboardLayout />,
        </div>
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  )
}

export default App

