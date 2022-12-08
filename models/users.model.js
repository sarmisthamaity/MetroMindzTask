const { object } = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    profilePicture: {
        type: Object,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    Password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Customer']
    },
    status: {
        type: String,
        enum: ['active', 'inActive']
    },
    phone: {
        type: Number,
    }
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;