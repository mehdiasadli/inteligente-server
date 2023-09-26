const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    subfields: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subfield' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Field', fieldSchema);
