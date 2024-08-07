const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Create a new song
router.post('/newsong', async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).send({message:"New song added successfully!",song});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all songs
router.get('/allsongs', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send({message:"Here are all the songs in the database", songs});
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a song
router.patch('/update/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!song) {
      return res.status(404).send({message:"No song found with the given ID"});
    }
    res.send({message: "The song has been updated successfully", song });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a song
router.delete('/delete/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).send({message:"No song found with the given ID"});
    }
    res.send({message:"The song has been deleted successfully!",song});
  } catch (error) {
    res.status(500).send(error); 
  }
});

// Bulk insert songs
router.post('/bulk-add', async (req, res) => {
  try {
    const songs = req.body; // Expecting an array of song objects

    if (!Array.isArray(songs) || songs.length === 0) {
      return res.status(400).send({ error: 'Invalid input: Expecting a non-empty array of songs.' });
    }

    // Validate each song object (basic validation)
    for (const song of songs) {
      if (!song.title || !song.artist || !song.album || !song.genre) {
        return res.status(400).send({ error: 'Invalid song data: Each song must have title, artist, album, and genre.' });
      }
    }

    // Bulk insert
    const result = await Song.insertMany(songs);
    res.status(201).send({ message: 'All the songs added successfully!', result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


// Generate statistics
router.get('/stats', async (req, res) => {
  try {
    // Total number of songs
    const totalSongs = await Song.countDocuments();

    // Total number of unique artists
    const totalArtists = (await Song.distinct('artist')).length;

    // Total number of unique albums
    const totalAlbums = (await Song.distinct('album')).length;

    // Total number of unique genres
    const totalGenres = (await Song.distinct('genre')).length;

    // Number of songs in each genre
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Number of songs and albums per artist
    const songsAndAlbumsPerArtist = await Song.aggregate([
      { $group: { _id: "$artist", songsCount: { $sum: 1 }, albums: { $addToSet: "$album" } } },
      { $project: { albumsCount: { $size: "$albums" }, songsCount: 1 } },
      { $sort: { _id: 1 } }
    ]);

    // Number of songs in each album
    const songsPerAlbum = await Song.aggregate([
      { $group: { _id: "$album", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      message: 'Statistics generated successfully!',
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsPerGenre,
      songsAndAlbumsPerArtist,
      songsPerAlbum
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;
