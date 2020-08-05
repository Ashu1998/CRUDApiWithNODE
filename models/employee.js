const mongoose = require('mongoose');

const emplyeeSchema = mongoose.Schema({
  
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true

    },
    company: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee',emplyeeSchema);