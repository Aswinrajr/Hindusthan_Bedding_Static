const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    visitDate: {
        type: String, // Storing as YYYY-MM-DD
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);
