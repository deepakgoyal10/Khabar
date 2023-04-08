import './App.css';

import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom"
export default class App extends Component {
  newsPerPage = 12
  country = 'in'
  apiKey = process.env.REACT_APP_NEWS_API
state = {
  progress : 0,
}

// setting state for progeress bar and will send it as props to news component
  setProgress=(progress) =>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>


        <Router>
          
        <NavBar/>

        {/* //code for progress bar */}
        <LoadingBar
        height={2}
        color='#f11946'
        progress={this.state.progress}

      />

        <Routes>
        {/* We use key="" to remount the process it means if we are on science category and we want to switch to general category without key it will not jump on the category without manual reloding  but if use key we can directly go to science to general just tapping on it.*/}
        <Route exect path='/' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="geneal" pageSize={this.newsPerPage} country={this.country} category="general" />} />
        <Route exect path='/science' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="science" pageSize={this.newsPerPage} country={this.country} category="science" />} />
        <Route exect path='/business' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="buisness" pageSize={this.newsPerPage} country={this.country} category="business" />} />
        <Route exect path='/entertainment' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="entertainment" pageSize={this.newsPerPage} country={this.country} category="entertainment" />} />
        <Route exect path='/general' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="general" pageSize={this.newsPerPage} country={this.country} category="general" />} />
        <Route exect path='/health' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="health" pageSize={this.newsPerPage} country={this.country} category="health" />} />
        <Route exect path='/sports' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="sports" pageSize={this.newsPerPage} country={this.country} category="sports" />} />
        <Route exect path='/technology' element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="technology" pageSize={this.newsPerPage} country={this.country} category="technology" />} />

        </Routes>

        </Router>

      </div>
    )
  }
}


