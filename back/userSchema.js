const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Check if the model is already compiled
const modelName = 'user';
if (!mongoose.modelNames().includes(modelName)) {
    mongoose.model(modelName, userSchema);
}

module.exports = mongoose.model(modelName);
