const mongoose= require('mongoose');
const { Schema } = mongoose;

const watchlistSchema= new mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    watchlist: [
        { type: Schema.Types.Mixed }
    ]
    
    
});

module.exports= mongoose.model('watchlist',watchlistSchema);