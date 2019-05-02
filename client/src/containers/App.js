import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Main from './Main'
import NavBar from './Navbar';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import store from '../store'


if(localStorage.token) {
  setAuthorizationToken(localStorage.token);

  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.token)));
  } catch(err) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="hero">
        <NavBar message/>
        <Main />
      </div>
    </Router>
  </Provider>
);


export default App;
