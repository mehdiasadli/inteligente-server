const mongoose = require('mongoose');

const subfieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subfield', subfieldSchema);
