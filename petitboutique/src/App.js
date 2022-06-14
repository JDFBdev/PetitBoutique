import React from 'react';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Admin from './Components/Admin/Admin';

function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Search" element={<Search />}/>
          <Route path="/Admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
