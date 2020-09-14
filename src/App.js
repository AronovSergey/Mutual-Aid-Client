import React from 'react';
import { useSelector } from "react-redux";
import Layout from './Layout/Layout';
import LoggedInPages from './pages/LoggedInPages';
import NotLoggedInPages from './pages/NotLoggedInPages';

function App() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
      <Layout>
          {isAuth ? <LoggedInPages /> : <NotLoggedInPages />}
      </Layout>
  );
}

export default App;
