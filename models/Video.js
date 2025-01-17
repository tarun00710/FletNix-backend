const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  show_id: { type: String, required: true }, 
  type: { type: String, required: true }, 
  title: { type: String, required: true }, 
  director: { type: String, required: false }, 
  country: { type: String, required: false }, 
  date_added: { type: Date, required: false },
  release_year: { type: Number, required: true },
  rating: { type: String, required: false }, 
  duration: { type: String, required: false }, 
  listed_in: { type: String, required: true }, 
  description: { type: String, required: true } 
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
