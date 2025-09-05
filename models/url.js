const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
        shortId:{
            type: String,
            unique: true,
        },
        redirectURL :{
            type: String,
            unique: true,
        },
        visitHistory:[{ timestamp: {type: Number} }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
},
{ timestamps: true }
);

const URl = mongoose.model('URL', urlSchema)

module.exports = URl;