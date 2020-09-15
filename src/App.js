import React from 'react';
import { useSelector } from "react-redux";
import Layout from './Layout/Layout';
import LoggedInPages from './pages/LoggedInPages';
import NotLoggedInPages from './pages/NotLoggedInPages';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from './theme';


function App() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <MuiThemeProvider theme={theme}>
      <Layout>
          {isAuth ? <LoggedInPages /> : <NotLoggedInPages />}
      </Layout>
    </MuiThemeProvider>  
  );
}

export default App;
