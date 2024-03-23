import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  const pagesize = 15;
  const APIkey = process.env.REACT_APP_NEWS_API  // For API key

  const [progress, setProgress] = useState(0);

  return (
    <div>
      {/* Loading Bar Code Below */}
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          shadow={true}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={
            <News changeProgress={setProgress} apikey={APIkey} pagesize={pagesize} category="general" />
          } />
          <Route exact path="/general" element={
            <News changeProgress={setProgress} apikey={APIkey} key="general" pagesize={pagesize} category="general" />
          } />
          <Route exact path="/business" element={
            <News changeProgress={setProgress} apikey={APIkey} key="business" pagesize={pagesize} category="business" />
          } />
          <Route exact path="/entertainment" element={
            <News changeProgress={setProgress} apikey={APIkey} key="entertainment" pagesize={pagesize} category="entertainment" />
          } />
          <Route exact path="/health" element={
            <News changeProgress={setProgress} apikey={APIkey} key="health" pagesize={pagesize} category="health" />
          } />
          <Route exact path="/science" element={
            <News changeProgress={setProgress} apikey={APIkey} key="science" pagesize={pagesize} category="science" />
          } />
          <Route exact path="/sports" element={
            <News changeProgress={setProgress} apikey={APIkey} key="sports" pagesize={pagesize} category="sports" />
          } />
          <Route exact path="/technology" element={
            <News changeProgress={setProgress} apikey={APIkey} key="technology" pagesize={pagesize} category="technology" />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;