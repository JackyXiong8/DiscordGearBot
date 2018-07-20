var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StatSchema = new mongoose.Schema({
    id: {type: Number},
    ap: {type: Number},
    family: {type: String},
    class: {type: String},
    level: {type: Number},
    awakening: {type: Number},
    dp: {type: Number},
    axe: {type: String}
});

mongoose.model('Stat', StatSchema)