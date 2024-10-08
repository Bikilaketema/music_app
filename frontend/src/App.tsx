import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';
import EditSongForm from './components/EditSongForm';
import Statistics from './components/Statistics';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/add-song" element={<AddSongForm />} />
        <Route path="/edit-song/:id" element={<EditSongForm />} />
        <Route path="/stat" element={<Statistics />} />
      </Routes>
    </Router>
  );
};

export default App;
