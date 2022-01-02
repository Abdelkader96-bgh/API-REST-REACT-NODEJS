const mongoose = require('mongoose');
const categorie = require("./categories")


const cabaneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categorie: {type: mongoose.Schema.Types.ObjectId,ref:categorie},
  price: { type: Number, required: true },
  partner:{ type: String, required: true },
  imageUrl: { type: String, required: true }, 
  description: { type: String, required: true },
});

module.exports = mongoose.model('Cabane', cabaneSchema);