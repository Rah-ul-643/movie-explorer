const router = require('express').Router();

const watchlist = require('../models/watchlist');

const { getRecords, updateRecord } = require('../controllers/dbController');
const model = watchlist;

router.get('/', async (req, res) => {
    const username = req.query;

    try {
        const document = await getRecords(model, username);
        const results = document.watchlist;

        res.status(200).json(results);

    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }

})


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const username = req.query.username;
    console.log(username);
    try {
        const document = await getRecords(model, {username:username});
        const updatedList = document.watchlist.filter(movie => movie.id != id);
        await updateRecord(model,{username:username},{username:username, watchlist:updatedList})
        console.log(updatedList.length);
        res.status(200).json({ success: true, message: "Removed from watchlist" });

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to remove from watchlist", error: error })
    }
    
})

router.post('/add', async (req, res) => {
    const {username,movie} = req.body;

    try {
        const document = await getRecords(model, username);
        const watchlist = document.watchlist;
        const existingMovie = watchlist.find(item => item.id == movie.id);

        if (! existingMovie){
            watchlist.push(movie);
            await document.save();
            res.status(200).json({ success: true, message: "Added to watchlist" });
        }
        else{
            res.status(200).json({success:true, message:"Movie already in watchlist"});
        }

    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to add to watchlist", error: error })
    }
})

module.exports = router;