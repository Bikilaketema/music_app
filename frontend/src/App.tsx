import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/add-song" element={<AddSongForm />} />
      </Routes>
    </Router>
  );
};

export default App;
