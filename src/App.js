import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { GlobalContextProvider } from './context/global-context';
import { ThemeContext } from './context/theme-context';

import Home from './pages/Home';
import CoinDetails from './pages/CoinDetails';
import NotFound from './pages/NotFound';

import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <GlobalContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </GlobalContextProvider>
    </>
  );
}

export default App;
