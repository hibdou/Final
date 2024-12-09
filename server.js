const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/census_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Census Schema
const censusSchema = new mongoose.Schema({
  year: Number,
  censusTaker: String,
  peopleInHousehold: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
});

const Census = mongoose.model('Census', censusSchema);

// CRUD Routes
// Create
app.post('/api/census', async (req, res) => {
  const { year, censusTaker, peopleInHousehold, address } = req.body;
  const newCensus = new Census({ year, censusTaker, peopleInHousehold, address });
  try {
    await newCensus.save();
    res.status(201).json(newCensus);
  } catch (err) {
    res.status(400).json({ error: 'Error creating Census record' });
  }
});

// Read all
app.get('/api/census', async (req, res) => {
  try {
    const census = await Census.find();
    res.json(census);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching Census records' });
  }
});

// Update
app.put('/api/census/:id', async (req, res) => {
  const { year, censusTaker, peopleInHousehold, address } = req.body;
  try {
    const updatedCensus = await Census.findByIdAndUpdate(
      req.params.id,
      { year, censusTaker, peopleInHousehold, address },
      { new: true }
    );
    res.json(updatedCensus);
  } catch (err) {
    res.status(400).json({ error: 'Error updating Census record' });
  }
});

// Delete
app.delete('/api/census/:id', async (req, res) => {
  try {
    await Census.findByIdAndDelete(req.params.id);
    res.json({ message: 'Census record deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting Census record' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
