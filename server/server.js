const express= require('express');
const app= express();
const port= process.env.PORT || 4000;
const cors = require('cors');

const userRoutes= require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');

// DB connection (mongoose)
const dbConnect = require('./config/database');
dbConnect();

// cors
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/',userRoutes);
app.use('/api/watchlist/',listRoutes);

app.listen(port,() => {
    console.log(`server up and running on port: ${port}`);
})