const mongoose = require('mongoose');

//a schema that accommodates many skills
const skillsSchema = mongoose.Schema({

      name: { type: String}

});

module.exports = mongoose.model('Skills', skillsSchema);