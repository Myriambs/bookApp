const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

titre:{
    type:String,
    required:true
} , 
image:{
    type:String,
    default:'https://www.mjc-castanet-tolosan.fr/wp-content/uploads/2016/06/Pas-dimage-disponible1-e1466657277567.jpg'
},
author: { type: String, required: true },
genre: { type: String },
})

module.exports = mongoose.model('Book',bookSchema)