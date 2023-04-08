import './App.css';

import React, { useState } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
const App = () => {
  const newsPerPage = 12
  const country = 'in'
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)

  // setting state for progeress bar and will send it as props to news component
  return (
    <div>


      <Router>

        <NavBar />

        {/* //code for progress bar */}
        <LoadingBar
          height={2}
          color='#f11946'
          progress={progress}

        />

        <Routes>
          {/* We use key="" to remount the process it means if we are on science category and we want to switch to general category without key it will not jump on the category without manual reloding  but if use key we can directly go to science to general just tapping on it.*/}
          <Route exect path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="geneal" pageSize={newsPerPage} country={country} category="general" />} />
          <Route exect path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={newsPerPage} country={country} category="science" />} />
          <Route exect path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="buisness" pageSize={newsPerPage} country={country} category="business" />} />
          <Route exect path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={newsPerPage} country={country} category="entertainment" />} />
          <Route exect path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={newsPerPage} country={country} category="general" />} />
          <Route exect path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={newsPerPage} country={country} category="health" />} />
          <Route exect path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={newsPerPage} country={country} category="sports" />} />
          <Route exect path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={newsPerPage} country={country} category="technology" />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App

