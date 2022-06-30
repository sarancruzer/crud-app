import React from 'react';
import './App.css';
// import { HashRouter as Router, Route } from "react-router-dom";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { UserList } from './components/UserList';
import { UserCreate } from './components/UserCreate';
import { UserEdit } from './components/UserEdit';

const App: React.FC = () => {
  return (
    <div className="App">



      <Router>

        <Routes>
          <Route path="/" element={<Home name={''} />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/edit/:id" element={<UserEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
