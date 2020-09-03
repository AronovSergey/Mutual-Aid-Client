import React from 'react';
import './App.css';
import Layout from './Layout/Layout';

import LoggedInPages from './pages/LoggedInPages';
import NotLoggedInPages from './pages/NotLoggedInPages';

const isAuth = true;

function App() {
  return (
      <Layout>
          {isAuth ? <LoggedInPages /> : <NotLoggedInPages />}
      </Layout>
  );
}

export default App;
