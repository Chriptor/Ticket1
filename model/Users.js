const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    ap_pat: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    ap_mat: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);