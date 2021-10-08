const mongoose = require('mongoose')

const presupuestoSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    nombre: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    proyecto: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    version: {
        type: String,
        required: true,
        min: 3,
        max: 150
    },
    
})

module.exports = mongoose.model('presupuesto', presupuestoSchema);