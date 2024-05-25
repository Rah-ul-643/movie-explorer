const router = require('express').Router();
const bcrypt= require('bcrypt');

const userModel = require('../models/users');
const watchlistModel = require('../models/watchlist');
const { getRecords,createNewRecord } = require('../controllers/dbController');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {   

        const user = await getRecords(userModel,{username:username});
        if (user) {
            const resObj= {'name': user.name,'username': user.username};
            console.log("authenticted");
            await bcrypt.compare(password, user.password) ? 
                res.json({ user: resObj, success: true, message: "Logged in successfully" }) : 
                res.json({ success: false, message: "Incorrect Password" });
        }

        else res.json({ success: false, message: "User does not exist" });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

})

router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const user = await getRecords(userModel,{username:username});
        if (!user) {
            const encryptedPassword=await bcrypt.hash(password,10);
            const newUser = { name, username, password:encryptedPassword };
            console.log(newUser);

            await createNewRecord(userModel,newUser);
            await createNewRecord(watchlistModel,{username:username,watchlist:[]});
            console.log("New user created.");

            res.json({ success: true, message: "Registered successfully" });
        }
        else {
            res.json({ success: false, message: "Email already in use" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

})

module.exports = router;