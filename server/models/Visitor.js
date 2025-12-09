import mongoose from 'mongoose';

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

export default mongoose.model('Visitor', visitorSchema);
