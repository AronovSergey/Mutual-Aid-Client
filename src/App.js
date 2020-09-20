import './App.css';
import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout/Layout';
//Routes
import store from './redux/store';
import LoggedInPages from './pages/loggedInPages';
import NotLoggedInPages from './pages/notLoggedInPages';
import { SIGN_IN } from './redux/actions/types';
//MUI Stuff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

const token = localStorage.token;
if(token) {
  store.dispatch({ type: SIGN_IN, payload:{ token } })
} 

function App() {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <React.StrictMode>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Layout>
                {isAuth ? <LoggedInPages /> : <NotLoggedInPages />}
            </Layout>
          </MuiThemeProvider> 
        </BrowserRouter> 
    </React.StrictMode>
  );
}

export default App;
