require('dotenv').config();
const express = require('express');
const sequelize = require('./database/setup');
const Track = require('./models/track');

const app = express();
app.use(express.json());

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('DB connection error:', err));

// --- CRUD Endpoints ---

// GET all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET track by ID
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new track
app.post('/api/tracks', async (req, res) => {
  const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;
  if (!songTitle || !artistName || !albumName || !genre) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newTrack = await Track.create({ songTitle, artistName, albumName, genre, duration, releaseYear });
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    await track.update(req.body);
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    await track.destroy();
    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
