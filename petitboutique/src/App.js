import React from 'react';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Search" element={<Search />}/>
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
